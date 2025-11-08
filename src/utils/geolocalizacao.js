/**
 * Obtém a localização atual do usuário usando a API de Geolocalização do navegador.
 * Retorna uma Promise com latitude e longitude.
 */
export function obterLocalizacaoAtual() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocalização não é suportada pelo seu dispositivo.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude, longitude });
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        reject("Não foi possível acessar sua localização.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  });
}
