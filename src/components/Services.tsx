import { ClipboardPlus, Hospital, Search } from "lucide-react"
import { Card } from "./Card"

export function Services() {
    return (
        <div className="flex flex-col items-center justify-center mt-14 gap-8 mb-10">
            <h1 className="text-3xl font-bold">
                Nossos serviços
            </h1>

            <p className="text-xl text-slate-500 text-center">
                O nosso objetivo é facilitar o acesso a informações básicas de saúde. Sendo assim, fornecemos alguns serviços que incluem desde orientações sobre diversas doenças até um Chat Bot para realizar um auto diagnóstico, além de um mapa para sinalizar de acordo com sua localização quais os pontos de atendimento médico mais próximos.
            </p>

            <div className="grid grid-cols-3 gap-10">
                <Card
                    title="Procure doenças"
                    description="Pesquise por uma determinada doença para ter acesso a mais detalhes como sitomas, tratamento e precauções."
                    icon={<Search className="scale-x-[-1] text-cyan-300 hover:animate-pulse" size={100} />}
                />

                <Card
                    title="Hospitais próximos"
                    description="Abra o mapa e tenha acesso a todos os hospitais mais próximos de você para buscar atendimento médico."
                    icon={<Hospital className="text-cyan-300 hover:animate-pulse" size={100} />}
                />

                <Card
                    title="Auto diagnóstico"
                    description="Informe os sintomas que você está sentido e veja quais são as possíveis doenças que você pode ter."
                    icon={<ClipboardPlus className="text-cyan-300 hover:animate-pulse" size={100} />}
                />
            </div>
        </div>
    )
}
