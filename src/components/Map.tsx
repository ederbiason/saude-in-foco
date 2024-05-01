
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from "react"
import L, { LatLngTuple } from "leaflet"
import { PlaceNode, fetchHospitals } from '@/utils/overpass'
import { Link } from "react-router-dom"

interface MapProps {
    center: LatLngTuple
}

function ChangeView({ center }: MapProps) {
    const map = useMap();
    map.setView(center);
    return null;
}

export function Map({ center }: MapProps) {
    const [coord, setCoord] = useState<LatLngTuple>([-23.3045, -51.1696])
    const [hospitals, setHospitals] = useState<PlaceNode[]>([])

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoord([position.coords.latitude, position.coords.longitude])
            })

        } else {
            console.log("Geolocation não tem suporte para este navegador.")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedHospitals = await fetchHospitals(coord)
                setHospitals(fetchedHospitals)
            } catch (error) {
                console.error('Erro ao buscar hospitais:', error)
            }
        }

        fetchData()
    }, [coord])

    useEffect(() => {
        getMyLocation()
    }, [])

    return (
        <div className="pb-14">
            <MapContainer
                style={{
                    height: '100vh',
                    width: '100%'
                }}
                center={center}
                zoom={13}
                scrollWheelZoom={false}
            >
                <ChangeView center={coord} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {hospitals?.map((hospital) => (
                    <Link to={`${hospital.tags.website}`} key={hospital.id}>
                        <Marker
                            
                            icon={new L.Icon({
                                iconUrl: "https://cdn3.iconfinder.com/data/icons/medical-3-1/512/hospital_place-512.png",
                                iconRetinaUrl: "https://cdn3.iconfinder.com/data/icons/medical-3-1/512/hospital_place-512.png",
                                iconSize: [40, 40],
                                iconAnchor: [12.5, 40],
                                popupAnchor: [0, -41],
                            })}
                            position={[hospital.lat, hospital.lon]}
                        >
                            <Popup>
                                <h1 className="font-bold text-xl">
                                    {hospital.tags.name}
                                </h1>

                                <p className="text-lg">
                                    {hospital.tags["addr:street"]} - {hospital.tags["addr:housenumber"]}
                                </p>
                            </Popup>
                        </Marker>
                    </Link>
                ))}

                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon,
                        iconRetinaUrl: MarkerIcon,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow,
                        shadowSize: [41, 41],
                    })
                } position={coord}>
                    <Popup>
                        Você esta aqui!
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
