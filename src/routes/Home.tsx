import { Hero } from "@/components/Hero";
import { News } from "@/components/News";
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