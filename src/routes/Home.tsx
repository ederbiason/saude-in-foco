import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export function Home() {
    return (
        <div className="px-40">
            <Hero />

            <Services />

            <News />
        </div>
    )
}