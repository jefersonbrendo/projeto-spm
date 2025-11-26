export function abrirRotaGoogleMaps(lat, lng) {
  if (!lat || !lng) return;

  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Abre no Google Maps (app ou navegador)
  window.open(url, "_blank");
}
