import { useRef, useEffect } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useMapa } from "../hooks/useMapa";
import { CenterMapButton } from "../components/map/CenterMapButton";
import L from "leaflet";
import { abrirRotaGoogleMaps } from "../utils/maps";

export default function Mapa() {
  const { posicaoAtual, delegacias, ready, maisProxima } = useMapa();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([posicaoAtual.lat, posicaoAtual.lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    mapRef.current = map;

    // Ícone do usuário
    const userIcon = L.icon({
      iconUrl: "/icons/icone-user-mapa.png",
      iconSize: [30, 30],
      iconAnchor: [27, 55],
    });

    L.marker([posicaoAtual.lat, posicaoAtual.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("Você está aqui");

    // Ícone normal de delegacia
    const delegaciaNormal = L.icon({
      iconUrl: "/icons/delegacia.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    // Ícone da delegacia mais próxima (destacado)
    const delegaciaDestaque = L.icon({
      iconUrl: "/icons/delegacia.png",
      iconSize: [55, 55],
      iconAnchor: [27, 55],
      className: "pulse-marker", // glow suave (Life360 style)
    });

    // Criar marcadores
    delegacias.forEach((d) => {
      const isMaisProxima =
        maisProxima && maisProxima.lat === d.lat && maisProxima.lng === d.lng;

      const icon = isMaisProxima ? delegaciaDestaque : delegaciaNormal;

      const marker = L.marker([d.lat, d.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <b>${d.nome}</b><br/>
        ${
          isMaisProxima
            ? `<span style="color:#6B4CFF;font-weight:bold">Delegacia mais próxima</span><br/>`
            : ""
        }
        <button 
          onclick="window.__abrirRotaGoogleMaps(${d.lat}, ${d.lng})"
          style="
            margin-top: 6px;
            padding: 7px 12px;
            background: #9576F7;
            color: white;
            border-radius: 8px;
            border: none;
            cursor: pointer;
          "
        >
          Ir
        </button>
      `);
    });
  }, [ready, posicaoAtual, delegacias, maisProxima]);

  // Expor função global para pop-ups
  window.__abrirRotaGoogleMaps = abrirRotaGoogleMaps;

  const centralizarMapa = () => {
    if (mapRef.current && posicaoAtual) {
      mapRef.current.setView([posicaoAtual.lat, posicaoAtual.lng], 16, {
        animate: true,
      });
    }
  };

  return (
    <MainLayout title="Mapa">
      {!ready ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg animate-pulse">Carregando mapa…</p>
        </div>
      ) : (
        <div className="relative w-full flex-1 h-full min-h-[75vh]">
          <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full rounded-b-3xl overflow-hidden"
          />

          <CenterMapButton onClick={centralizarMapa} />
        </div>
      )}
    </MainLayout>
  );
}
