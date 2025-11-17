// src/pages/MapaDelegacias.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MainLayout } from "../components/layout/MainLayout";
import { useMapaDelegacias } from "../hooks/useMapaDelegacias";

// Fixar ícones do Leaflet (necessário para React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Ícone azul para localização atual
const iconLocalizacao = L.icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function RecenterMap({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng && map) {
            map.setView([lat, lng], 14);
        }
    }, [lat, lng, map]);
    return null;
}

export default function MapaDelegacias() {
    const { delegacias, loading, erro, localizacaoAtual, carregarDelegacias } =
        useMapaDelegacias();

    useEffect(() => {
        carregarDelegacias();
    }, [carregarDelegacias]);

    // DEBUG: Log das delegacias quando carregam
    useEffect(() => {
        if (delegacias.length > 0) {
            console.log(`🗺️ MapaDelegacias: ${delegacias.length} delegacias para renderizar`);
            console.log("Primeiras 3:", delegacias.slice(0, 3));
            console.table(delegacias.slice(0, 3).map(d => ({
                name: d.name,
                lat: d.lat,
                lng: d.lng,
                latType: typeof d.lat,
                lngType: typeof d.lng
            })));
        }
    }, [delegacias]);

    if (loading) {
        return (
            <MainLayout>
                <div className="w-full h-full flex flex-col items-center justify-center px-4">
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600 font-medium">
                            Carregando delegacias próximas...
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Isso pode levar alguns segundos
                        </p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (erro && !localizacaoAtual) {
        return (
            <MainLayout>
                <div className="w-full h-full flex flex-col items-center justify-center px-4">
                    <div className="text-center max-w-sm">
                        <div className="mb-4 text-4xl">📍</div>
                        <p className="text-red-600 font-semibold mb-2">{erro}</p>
                        <p className="text-gray-500 text-sm mb-6">
                            Certifique-se de que a geolocalização está habilitada
                        </p>
                        <button
                            onClick={carregarDelegacias}
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col bg-gray-50">
                {/* Header com informações */}
                <div className="px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
                    <h2 className="font-semibold text-gray-800">Delegacias Próximas</h2>
                    <p className="text-sm text-gray-500">
                        {delegacias.length} delegacia{delegacias.length !== 1 ? "s" : ""} encontrada{delegacias.length !== 1 ? "s" : ""} dentro de até 5 km
                    </p>
                </div>

                {/* Mapa - Container com altura corrigida */}
                {localizacaoAtual && (
                    <div className="w-full flex-1 overflow-hidden">
                        <MapContainer
                            center={[localizacaoAtual.latitude, localizacaoAtual.longitude]}
                            zoom={14}
                            scrollWheelZoom={true}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Recentra o mapa quando a localização muda */}
                            <RecenterMap lat={localizacaoAtual.latitude} lng={localizacaoAtual.longitude} />

                            {/* Marker da localização atual */}
                            <Marker
                                position={[
                                    localizacaoAtual.latitude,
                                    localizacaoAtual.longitude,
                                ]}
                                icon={iconLocalizacao}
                            >
                                <Popup>
                                    <div>
                                        <p className="font-semibold text-sm">
                                            📍 Sua localização
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Lat: {localizacaoAtual.latitude.toFixed(4)}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Lon: {localizacaoAtual.longitude.toFixed(4)}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* Markers das delegacias */}
                            {delegacias.map((delegacia) => (
                                <Marker
                                    key={delegacia.id}
                                    position={[delegacia.lat, delegacia.lng]}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold text-purple-600">
                                                🚔 {delegacia.name}
                                            </h3>
                                            <p className="text-gray-600 text-xs mt-2">
                                                <strong>Tipo:</strong> {delegacia.tipo}
                                            </p>
                                            {delegacia.endereco && (
                                                <p className="text-gray-600 text-xs mt-1">
                                                    <strong>Endereço:</strong>{" "}
                                                    {delegacia.endereco}
                                                </p>
                                            )}
                                            {delegacia.telefone && (
                                                <a
                                                    href={`tel:${delegacia.telefone}`}
                                                    className="text-purple-600 text-xs mt-2 block hover:underline"
                                                >
                                                    📞 {delegacia.telefone}
                                                </a>
                                            )}
                                            {delegacia.website && (
                                                <a
                                                    href={delegacia.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-600 text-xs mt-1 block hover:underline"
                                                >
                                                    🌐 Visitar website
                                                </a>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                )}

                {/* Aviso se nenhuma delegacia encontrada */}
                {delegacias.length === 0 && !loading && erro && (
                    <div className="absolute bottom-20 left-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 z-10">
                        <p className="text-yellow-800 text-sm">⚠️ {erro}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
