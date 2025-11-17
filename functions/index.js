import functions from "firebase-functions";

/**
 * Buscar delegacias próximas usando Overpass API (OpenStreetMap)
 * Totalmente gratuito, sem necessidade de chave API
 */
export const encontrarDelegacias = functions
    .region('southamerica-east1')
    .https.onCall(async (data) => {

    // 1. Recebe 'latitude' e 'longitude' do app React
    const { latitude, longitude } = data;

    if (!latitude || !longitude) {
        throw new functions.https.HttpsError(
            'invalid-argument', 
            'Latitude e Longitude são obrigatórias.'
        );
    }

    try {
        // 2. Usar Overpass API (OpenStreetMap) - Totalmente gratuito
        // Bbox: 0.1 graus ≈ 11km
        const south = latitude - 0.1;
        const west = longitude - 0.1;
        const north = latitude + 0.1;
        const east = longitude + 0.1;

        const overpassQuery = `
            [bbox:${south},${west},${north},${east}];
            (
                node["amenity"="police"];
                way["amenity"="police"];
                relation["amenity"="police"];
            );
            out geom;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: overpassQuery,
            timeout: 15000
        });

        if (!response.ok) {
            throw new Error(`Overpass API retornou ${response.status}`);
        }

        const osm_data = await response.json();

        // 3. Converter elementos OSM para formato legível
        const delegacias = osm_data.elements
            .filter(el => el.lat && el.lon) // Apenas elementos com coordenadas
            .map((el) => {
                // Se for uma way/relation, usar centro
                let lat = el.lat;
                let lon = el.lon;
                if (el.center) {
                    lat = el.center.lat;
                    lon = el.center.lon;
                }

                return {
                    id: el.id,
                    lat: lat,
                    lng: lon,
                    name: el.tags?.name || 'Delegacia (sem nome)',
                    tipo: el.tags?.['police:type'] || 'Delegacia',
                    telefone: el.tags?.['contact:phone'] || '',
                    website: el.tags?.website || '',
                    endereco: el.tags?.['addr:full'] || 
                              `${el.tags?.['addr:street'] || ''} ${el.tags?.['addr:housenumber'] || ''}`.trim()
                };
            });

        // 4. Retorna a lista de delegacias
        return delegacias;

    } catch (error) {
        console.error("Erro ao buscar delegacias (Overpass API):", error.message);
        throw new functions.https.HttpsError(
            'internal', 
            'Não foi possível buscar delegacias próximas. Tente novamente.'
        );
    }
});