"use client";

import React, { useRef, useState, useEffect } from "react";
import { Shuffle, SkipBack, SkipForward, LucidePlay, Pause, Podcast } from "lucide-react";
import { AudiobookProgress } from "./audio-progress";
import { usePodcast } from "@/context/use-podcast";

export default function PlayBarCenter() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const { activePodcast } = usePodcast();


    // --- Play / Pause ---
    const handlePlayToggle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((err) => {
                console.error("Playback failed:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    // --- Update progress while playing ---
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) setDuration(audio.duration);
    };

    const handleSeek = (value: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = value;
            setCurrentTime(value);
        }
    };

    return (
        <div
            className="
        flex flex-col items-center 
        w-full sm:w-full md:w-[60%] lg:w-[40%]
        relative md:absolute md:left-1/2 md:-translate-x-1/2
      "
        >
            <audio
                ref={audioRef}
                src={activePodcast?.audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div className="items-center gap-3 sm:gap-4 md:gap-5 mb-2 md:mb-1 hidden lg:flex">
                <Shuffle className="h-5 w-5 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
                <SkipBack className="h-6 w-6 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />

                <button
                    onClick={handlePlayToggle}
                    className="
            flex items-center justify-center 
            w-11 h-11 rounded-full bg-secondary-button-background text-secondary-button-foreground 
            hover:scale-105 transition">
                    {isPlaying ? (
                        <Pause className="h-5 w-5" />
                    ) : (
                        <LucidePlay className="h-5 w-5" />
                    )}
                </button>

                <SkipForward className="h-6 w-6 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
            </div>

            <div className="w-full md:w-[85%] lg:w-full hidden lg:block">
                <AudiobookProgress
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                />
            </div>
        </div>
    );
}
