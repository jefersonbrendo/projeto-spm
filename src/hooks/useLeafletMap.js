import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export function useLeafletMap(center, zoom = 15) {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!center || mapRef.current) return;

    const map = L.map("leaflet-map-container", {
      zoomControl: false,
      attributionControl: false,
    }).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    setMapReady(true);

    return () => map.remove();
  }, [center]);

  const recenter = () => {
    if (mapRef.current && center) {
      mapRef.current.setView(center, zoom);
    }
  };

  return { mapRef, mapReady, recenter };
}
