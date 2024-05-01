import { diseases } from "@/utils/diseases"
import { useParams } from "react-router-dom"

export default function DiseaseDetail() {
    const { diseaseid } = useParams()

    const diseaseData = diseases.find(disease => disease.id === String(diseaseid))

    const symptomsArray = diseaseData?.sintomas.split(';')

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className="px-40 pt-10 pb-20 text-2xl flex flex-col gap-5">
            <h1 className="text-3xl font-bold">
                {diseaseData?.doenca}
            </h1>

            <div>
                <h2 className="font-semibold">
                    Sintomas:
                </h2>

                {symptomsArray?.map((symptom, index) => (
                    <p key={index}>
                        {capitalizeFirstLetter(symptom.trim()) + ";"}
                    </p>
                ))}
            </div>

            <div>
                <h2 className="font-semibold">
                    Tratamento:
                </h2>

                <p>
                    {diseaseData?.tratamento}
                </p>
            </div>
        </div>
    )
}
