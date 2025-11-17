import { useCallback, useEffect, useState } from "react";

function timeoutFetch(url, opts = {}, ms = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...opts, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371e3; // meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const SEED_DELEGACIAS = [
  {
    id: "seed-fortaleza-1",
    name: "Delegacia da Mulher - Fortaleza (Exemplo)",
    lat: -3.731862,
    lng: -38.526669,
    tipo: "delegacia",
    endereco: "Av. Monsenhor Tabosa, Fortaleza",
  },
  {
    id: "seed-fortaleza-2",
    name: "Delegacia Regional - Fortaleza (Exemplo)",
    lat: -3.71839,
    lng: -38.5434,
    tipo: "delegacia",
    endereco: "R. Senador Alencar, Fortaleza",
  },
];

export function useMapaDelegacias() {
  const [delegacias, setDelegacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [localizacaoAtual, setLocalizacaoAtual] = useState(null);

  const getPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocalização não suportada pelo navegador"));
      }
      const id = navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
      // nota: não usamos clearPosition, o navegador gerencia
    });
  }, []);

  const searchOverpass = useCallback(async (lat, lon, radius = 5000) => {
    try {
      const q = `[
out:json][timeout:25];(
  node["amenity"="police"](around:${radius},${lat},${lon});
  way["amenity"="police"](around:${radius},${lat},${lon});
  relation["amenity"="police"](around:${radius},${lat},${lon});
  node["office"="police"](around:${radius},${lat},${lon});
);
out center;`;

      const url = `https://overpass-api.de/api/interpreter`;
      const res = await timeoutFetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(q)}`,
      }, 20000);
      if (!res.ok) throw new Error(`Overpass erro: ${res.status}`);
      const data = await res.json();
      const items = (data.elements || []).map((el) => {
        const latRes = el.lat ?? (el.center && el.center.lat);
        const lonRes = el.lon ?? (el.center && el.center.lon);
        return {
          id: `${el.type}-${el.id}`,
          name: el.tags && (el.tags.name || el.tags.ref) ? (el.tags.name || el.tags.ref) : "Delegacia",
          lat: Number(latRes),
          lng: Number(lonRes),
          tipo: el.tags && el.tags.amenity ? el.tags.amenity : "police",
          endereco: el.tags && (el.tags['addr:full'] || el.tags['addr:street'] || el.tags['addr:housenumber']) ? `${el.tags['addr:street'] || ''} ${el.tags['addr:housenumber'] || ''}`.trim() : undefined,
          telefone: el.tags && el.tags['contact:phone'] ? el.tags['contact:phone'] : el.tags && el.tags.phone ? el.tags.phone : undefined,
          website: el.tags && el.tags.website ? el.tags.website : undefined,
        };
      }).filter(i => i.lat && i.lng);

      return items;
    } catch (err) {
      console.warn('Overpass falhou', err.message || err);
      return [];
    }
  }, []);

  const searchNominatim = useCallback(async (lat, lon, delta = 0.12) => {
    try {
      const left = lon - delta;
      const right = lon + delta;
      const top = lat + delta;
      const bottom = lat - delta;
      const viewbox = `${left},${top},${right},${bottom}`;
      const q = `delegacia policia`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=20&q=${encodeURIComponent(q)}&viewbox=${encodeURIComponent(viewbox)}&bounded=1`;
      const res = await timeoutFetch(url, {
        headers: { "User-Agent": "projeto-sas (contato@localhost)" },
      }, 12000);
      if (!res.ok) throw new Error(`Nominatim erro: ${res.status}`);
      const data = await res.json();
      const items = (data || []).map((it, idx) => ({
        id: `nom-${it.place_id || idx}`,
        name: it.display_name ? it.display_name.split(',')[0] : 'Delegacia',
        lat: Number(it.lat),
        lng: Number(it.lon),
        tipo: it.type || 'police',
        endereco: it.display_name,
      })).filter(i => i.lat && i.lng);
      return items;
    } catch (err) {
      console.warn('Nominatim falhou', err.message || err);
      return [];
    }
  }, []);

  const carregarDelegacias = useCallback(async () => {
    setLoading(true);
    setErro(null);
    setDelegacias([]);
    try {
      const coords = await getPosition();
      const lat = coords.latitude;
      const lon = coords.longitude;
      setLocalizacaoAtual({ latitude: lat, longitude: lon });

      // 1) Overpass (rápido para POIs locais) — usar 5km por padrão
      let results = await searchOverpass(lat, lon, 5000);

      // 2) Se vazio ou poucos resultados, tentar Nominatim com viewbox menor
      if (!results || results.length === 0) {
        results = await searchNominatim(lat, lon, 0.06);
      }

      // 3) Filtrar por distância (descartar alvos muito distantes)
      const filtered = (results || []).map(r => ({ ...r })).filter((r) => {
        const d = haversineDistance(lat, lon, r.lat, r.lng);
        return d <= 5000; // 5 km
      });

      // deduplicar por coordenada aproximada
      const seen = new Set();
      const dedup = [];
      for (const it of filtered) {
        const key = `${Math.round(it.lat * 10000)}|${Math.round(it.lng * 10000)}`;
        if (!seen.has(key)) {
          seen.add(key);
          dedup.push(it);
        }
      }

      // limitar número de itens mostrados
      const limited = dedup.slice(0, 30);

      // 4) Enriquecer endereço para itens sem 'endereco' usando Nominatim reverse (limite para evitar rate limits)
      const toEnrich = limited.filter(i => !i.endereco).slice(0, 8);
      for (const item of toEnrich) {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${item.lat}&lon=${item.lng}`;
          const res = await timeoutFetch(url, { headers: { "User-Agent": "projeto-sas (contato@localhost)" } }, 8000);
          if (res && res.ok) {
            const json = await res.json();
            if (json && json.display_name) item.endereco = json.display_name;
          }
        } catch (e) {
          // ignore
        }
      }

      if (limited.length > 0) {
        setDelegacias(limited);
      } else {
        // fallback local (sempre mostrar algo útil)
        const seededNearby = SEED_DELEGACIAS.map((s) => ({ ...s }));
        setDelegacias(seededNearby);
        setErro("Não foram encontradas delegacias próximas; mostrando resultados de exemplo.");
      }
    } catch (err) {
      console.warn('carregarDelegacias erro', err);
      setErro(err.message || 'Erro ao obter delegacias');
      // fallback local completo quando sem permissão de geolocalização
      setDelegacias(SEED_DELEGACIAS.map((s) => ({ ...s })));
    } finally {
      setLoading(false);
    }
  }, [getPosition, searchNominatim, searchOverpass]);

  useEffect(() => {
    // carrega automaticamente na montagem
    carregarDelegacias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    delegacias,
    loading,
    erro,
    localizacaoAtual,
    carregarDelegacias,
  };
}
