import { ReactNode } from "react"

interface CardProps {
    icon: ReactNode
    title: string
    description: string
}

export function Card({ title, description, icon }: CardProps) {
    return (
        <div className="flex flex-col gap-5 bg-blue-400 rounded-lg p-8 items-center">
            {icon}

            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-2xl font-bold">
                    {title}
                </h1>
                <p className="text-zinc-900 text-center">
                    {description}
                </p>
            </div>
        </div>
    )
}
