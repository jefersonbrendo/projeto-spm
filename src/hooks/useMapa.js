// src/hooks/useMapa.js
import { useEffect, useState } from "react";

// Função Haversine para calcular distância entre coordenadas
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // raio da Terra em KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // km
}

export function useMapa() {
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [delegacias, setDelegacias] = useState([]);
  const [ready, setReady] = useState(false);
  const [maisProxima, setMaisProxima] = useState(null);

  // 1) CAPTURAR LOCALIZAÇÃO ATUAL
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocalização não suportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosicaoAtual({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setReady(true);
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        setReady(true);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // 2) LISTA MANUAL DE DELEGACIAS DE FORTALEZA
  useEffect(() => {
    const listaDelegacias = [
      { nome: "Delegacia Policial - Vicente Pinzon", lat: -3.731169235144808, lng: -38.46267435618919 },
      { nome: "Delegacia de Defesa da Mulher", lat: -3.7578458274045183, lng: -38.559861536805506 },
      { nome: "DHPP - Homicídios e Proteção à Pessoa", lat: -3.7525247383449063, lng: -38.52368332736063 },
      { nome: "Delegacia-Geral da Polícia Civil – Borges de Melo", lat: -3.75920538436976, lng: -38.52605963904237 },
      { nome: "2º Distrito Policial - Meireles", lat: -3.731878605845242, lng: -38.50648863153899 },
      { nome: "10° Distrito Policial - Antônio Bezerra", lat: -3.7400036126980294, lng: -38.59149398972575 },
      { nome: "11° Distrito Policial - PanAmericano", lat: -3.7540979382537327, lng: -38.56538289599834 },
      { nome: "13º Distrito Policial – Cidade dos Funcionários", lat: -3.7972983685380166, lng: -38.50122994555225 },
      { nome: "30º Distrito Policial – São Cristóvão", lat: -3.8317410671977585, lng: -38.517727866216916 },
      { nome: "32° Distrito Policial - Granja Lisboa", lat: -3.797812372488262, lng: -38.618230983165816 },
      { nome: "34° Distrito Policial", lat: -3.7316843714843233, lng: -38.53717603565538 },
    ];

    setDelegacias(listaDelegacias);
  }, []);

  // 3) CALCULAR A DELEGACIA MAIS PRÓXIMA
  useEffect(() => {
    if (!posicaoAtual || delegacias.length === 0) return;

    let menorDistancia = Infinity;
    let maisPerto = null;

    delegacias.forEach((d) => {
      const dist = calcularDistanciaKm(
        posicaoAtual.lat,
        posicaoAtual.lng,
        d.lat,
        d.lng
      );

      if (dist < menorDistancia) {
        menorDistancia = dist;
        maisPerto = { ...d, distanciaKm: dist };
      }
    });

    setMaisProxima(maisPerto);
  }, [posicaoAtual, delegacias]);

  return { posicaoAtual, delegacias, maisProxima, ready };
}
