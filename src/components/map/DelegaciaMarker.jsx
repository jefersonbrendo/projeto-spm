import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const delegaciaIcon = L.icon({
  iconUrl: "/icons/delegacia-pin.png", // coloque o ícone correspondente
  iconSize: [40, 40],
});

export function DelegaciaMarker({ delegacia }) {
  return (
    <Marker position={[delegacia.lat, delegacia.lng]} icon={delegaciaIcon}>
      <Popup>{delegacia.nome}</Popup>
    </Marker>
  );
}
