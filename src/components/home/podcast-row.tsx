"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PodcastCard from "@/components/home/podcast-card";
import { podcast, PodcastType } from "@/types/models/podcast";

interface PodcastsProps {
    podcasts: podcast[];
    type: PodcastType;
}

const Podcasts = ({ podcasts, type }: PodcastsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState<string>("11.5rem"); // Fallback height

    useEffect(() => {
        if (cardRef.current) {
            const height = cardRef.current.getBoundingClientRect().height;
            setCardHeight(`${height}px`);
        }
    }, [podcasts]);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -clientWidth : clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="text-secondary-text rounded-lg w-full relative flex-1 min-w-0">
            <div className="relative">
                {podcasts.length === 0 ? (
                    <div
                        className="flex items-center justify-center p-3"
                        style={{ minHeight: cardHeight }}
                    >
                        <p className="text-primary-text text-lg">No podcast available</p>
                    </div>
                ) : (
                    <>
                        <div
                            ref={scrollRef}
                            className="flex gap-1 overflow-x-auto no-scroll"
                            style={{ minHeight: cardHeight }}
                        >
                            {podcasts.map((podcast: podcast, index: number) => (
                                <div ref={index === 0 ? cardRef : null} key={podcast.uuid}>
                                    <PodcastCard podcast={podcast} type={type} />
                                </div>
                            ))}
                        </div>

                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute -left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-primary-button-background hover:bg-primary-button-background/90 text-white p-2 rounded-lg shadow-lg"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className="absolute -right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-primary-button-background hover:bg-primary-button-background/90 text-white p-2 rounded-lg shadow-lg"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Podcasts;