/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/firebase"

interface VisitorProps {
    id: string
    ip: string
    network: string
    city: string
    region: string
}

export function Navbar() {
    const [visitorCounter, setVisitorCounter] = useState(0)

    useEffect(() => {
        async function visitorDetails() {
            const response = await axios.get("https://ipapi.co/json/")
            const data: VisitorProps = response.data

            if (localStorage.getItem("visitor") === null) {
                localStorage.setItem("visitor", JSON.stringify(data));
            }

            async function checkIfVisitorExists(field: string, value: string) {
                const querySnapshot = await getDocs(query(collection(db, "visitors"), where(field, "==", value)))
                return !querySnapshot.empty
            }

            const ipExists = await checkIfVisitorExists("ip", data.ip)
            const networkExists = await checkIfVisitorExists("network", data.network)

            if (!ipExists && !networkExists) {
                try {
                    await addDoc(collection(db, "visitors"), {
                        ip: data.ip,
                        network: data.network,
                        city: data.city,
                        region: data.region
                    })
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("Usuário já está na lista de visitadores.")
            }
        }

        visitorDetails()
    }, [])

    async function getVisitors() {
        const querySnapshot = await getDocs(collection(db, "visitors"));
        setVisitorCounter(querySnapshot.size)
    }

    useEffect(() => {
        getVisitors()
    }, [])

    return (
        <div className="w-full h-14 bg-blue-300 flex items-center px-40 justify-between">
            <div className="flex gap-5">
                <Link to="/" className="text-[#233348] font-bold uppercase">
                    Saúde em Foco
                </Link>
            </div>

            <div className="bg-slate-50 rounded-lg p-2 flex items-center justify-center gap-2">
                <p>
                    Acessos:
                </p>
                <p>
                    {visitorCounter}
                </p>
            </div>

            <div className="flex gap-10 font-semibold">
                <Link to="/diseases" className="hover:underline hover:text-[#233348]">
                    Doenças
                </Link>

                <Link to="/diagnoses" className="hover:underline hover:text-[#233348]">
                    Diagnóstico
                </Link>

                <Link to="/hospitals" className="hover:underline hover:text-[#233348]">
                    Hospitais
                </Link>
            </div>
        </div>
    )
}
