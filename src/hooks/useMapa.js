import { useEffect, useState } from "react";

export function useMapa() {
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocalização não suportada");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setPosicaoAtual(coords);
        setReady(true);
      },
      (err) => console.error("Erro:", err),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const delegacias = [
    { nome: "Delegacia 1", lat: -3.745, lng: -38.523 },
    { nome: "Delegacia 2", lat: -3.743, lng: -38.508 },
  ];

  return { posicaoAtual, delegacias, ready };
}
