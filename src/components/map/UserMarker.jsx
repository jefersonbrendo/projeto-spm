import { Marker, Popup } from "react-leaflet";
import L from "leaflet";


const userIcon = L.icon({
  iconUrl: "../../assets/icons/icone-user-mapa.png",
  iconSize: [40, 40],
});

export function UserMarker({ position }) {
  return (
    <Marker position={[position.lat, position.lng]} icon={userIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}
