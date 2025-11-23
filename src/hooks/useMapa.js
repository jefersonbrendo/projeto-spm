// src/hooks/useMapa.js
import { useEffect, useState } from "react";

export function useMapa() {
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [delegacias, setDelegacias] = useState([]);
  const [ready, setReady] = useState(false);

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
      {
        nome: "Delegacia-Geral da Polícia Civil  – Borges de Melo",
        lat: -3.75920538436976,
        lng: -38.52605963904237,
      }, // certo
      {
        nome: "5º Distrito Policial – Benfica",
        lat: -3.741991,
        lng: -38.524205,
      },
      {
        nome: "7º Distrito Policial – Pirambu",
        lat: -3.720949,
        lng: -38.549638,
      },
      {
        nome: "8º Distrito Policial – José Bonifácio",
        lat: -3.736638,
        lng: -38.523074,
      },
      {
        nome: "11º Distrito Policial – Pan Americano",
        lat: -3.754842,
        lng: -38.542885,
      },
      {
        nome: "12º Distrito Policial – Conjunto Ceará",
        lat: -3.773784,
        lng: -38.585748,
      },
      {
        nome: "13º Distrito Policial – Cidade dos Funcionários",
        lat: -3.7972983685380166,
        lng: -38.50122994555225,
      }, // certo
      {
        nome: "16º Distrito Policial – Castelão",
        lat: -3.794292166931239,
        lng: -38.51824520721979,
      }, // certo
      {
        nome: "25º Distrito Policial – Aeroporto",
        lat: -3.771976817913626,
        lng: -38.53710485894492,
      }, // certo
      {
        nome: "30º Distrito Policial – São Cristóvão",
        lat: -3.788446,
        lng: -38.589347,
      },
      {
        nome: "34º Distrito Policial – Centro",
        lat: -3.726942,
        lng: -38.526523,
      },
    ];

    setDelegacias(listaDelegacias);
  }, []);

  return { posicaoAtual, delegacias, ready };
}
