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
import axios from "axios"

import moment from 'moment';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

interface NewProps {
    title: string
    description: string
    content: string
    url: string
    image: string
    publishedAt: string
    source: {
        name: string
        url: string
    }
}

export function News() {
    const [articles, setArticles] = useState<NewProps[]>([])

    useEffect(() => {
        async function getNews() {
            const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "b7cc753d91f6f5e58db24beed93af69e"

            try {
                const res = await axios.get(`https://gnews.io/api/v4/top-headlines?category=health&lang=pt&country=br&max=10&apikey=${NEWS_API_KEY}`)

                if (res.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                setArticles(res.data.articles)


                console.log(articles)
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
        getNews()
    }, [])

    return (
        <section className="w-full pt-10 pb-28">
            <div className="mx-auto lg:max-w-6xl px-3">
                <Carousel className="flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-center">
                        Fique por dentro das últimas notícias
                    </h1>
                    <CarouselContent>
                        {articles.map((article: NewProps) => (
                            <CarouselItem key={article.title} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square flex-col overflow-hidden rounded-t-lg relative w-full h-96">
                                            <img
                                                src={article.image}
                                                alt="Imagem genérica para uma notícia de saúde."
                                                className="w-full h-full"
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
