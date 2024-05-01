import { Map } from "@/components/Map";
import { LatLngTuple } from "leaflet";
import { useState } from "react";

export default function Hospitals() {
    const [coord, setCoord] = useState<LatLngTuple>([0,0])

    navigator.geolocation.getCurrentPosition((position) => {
        setCoord([position.coords.latitude, position.coords.longitude])
    })

    return (
        <div className="w-full h-full">
            <Map center={coord} />
        </div>
    )
}
