/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MoveRight } from "lucide-react"
import newsImage from "@/assets/noticias.png"
import axios from "axios"

import moment from 'moment';
import { Link } from "react-router-dom"

interface NewProps {
    source: { id: string, name: string }
    author: string
    title: string
    description: any
    url: string
    urlToImage: any
    publishedAt: string
    content: any
}

async function getNews() {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=br&category=health&apiKey=${process.env.NEWS_API_KEY}`)

    if (res.status != 200) {
        throw new Error('Failed to fetch data')
    }

    return res.data
}

export async function News() {
    const { articles } = await getNews()

    return (
        <section className="w-full pt-10 pb-20">
            <div className="mx-auto lg:max-w-6xl px-3">
                <Carousel className="flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-center">
                        Fique por dentro das últimas notícias
                    </h1>
                    <CarouselContent>
                        {articles.map((article: NewProps) => (
                            <CarouselItem key={article.source.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square flex-col overflow-hidden rounded-t-lg relative w-full h-96">
                                            <img
                                                src={newsImage}
                                                alt="Imagem genérica para uma notícia de saúde."
                                                className=""
                                            />

                                            <div className="px-5 pt-3 pb-10 flex flex-col gap-3 h-full justify-between">
                                                <h1 className="font-semibold">
                                                    {article.title}
                                                </h1>

                                                <p>
                                                    <span className="font-semibold">Publicado em:</span> {moment(article.publishedAt).format('DD/MM/YYYY')}
                                                </p>
                                            </div>

                                            <Link
                                                to={article.url}
                                                target="_blank"
                                                rel="noop"
                                                className="flex text-blue-700 gap-3 items-center justify-end hover:text-blue-400 absolute bottom-2 right-3"
                                            >
                                                <p>Ler mais</p>
                                                <MoveRight />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                    <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                </Carousel>
            </div>
        </section>
    )
}
