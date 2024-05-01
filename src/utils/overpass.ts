import { LatLngTuple } from "leaflet";

const BASE_URL = "https://overpass-api.de/api/interpreter";

export type GeoPosition = {
    lat: number
    lon: number
}

export type PlaceNodeTags = {
    "addr:housenumber": string
    "addr:postcode": string
    "addr:street": string
    "addr:suburb": string
    amenity: string
    healthcare: string
    name: string
    operator: string
    "operator:type": string
    phone: string
    website: string
}

export type PlaceNode = {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: PlaceNodeTags;
}

export const fetchHospitals = async (
    position: LatLngTuple,
): Promise<PlaceNode[]> => {
    try {
        const query = `
        [out:json][timeout:25];
        (node[amenity=hospital](around:5000, ${position[0]}, ${position[1]}););
        out;
        >;
        out skel qt;
      `;

        const formBody = "data=" + encodeURIComponent(query);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: formBody
        };
        const response = await fetch(`${BASE_URL}`, requestOptions);
        const data = await response.json();

        console.log(data)

        return data.elements
    } catch (err) {
        console.error(`fetchMarkers Error: ${JSON.stringify(err)}`);
        return [];
    }
};

// https://overpass-api.de/api/interpreter?data=[out:json];%20%20%20%20%20%20node%20%20%20%20%20%20%20%20[amenity=college]%20%20%20%20%20%20%20%20(48.835474119784756,2.3644745349884033,48.874784201649106,2.407475709915161);%20%20%20%20%20%20out;