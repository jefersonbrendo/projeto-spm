import { useRef, useEffect } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useMapa } from "../hooks/useMapa";
import { CenterMapButton } from "../components/map/CenterMapButton";
import L from "leaflet";

export default function Mapa() {
  const { posicaoAtual, delegacias, ready } = useMapa();
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

    // Ícone do usuário (Life360 style)
    const userIcon = L.icon({
      iconUrl: "/icons/icone-user-mapa.png",
      iconSize: [30, 30],
      iconAnchor: [27, 55],
    });

    L.marker([posicaoAtual.lat, posicaoAtual.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("Você está aqui");

    // Ícones das delegacias
    const delIcon = L.icon({
      iconUrl: "/icons/delegacia.png",
      iconSize: [45, 45],
      iconAnchor: [22, 45],
    });

    delegacias.forEach((d) => {
      L.marker([d.lat, d.lng], { icon: delIcon }).addTo(map).bindPopup(d.nome);
    });
  }, [ready, posicaoAtual, delegacias]);

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
