"use client";
import { useEffect, useState, useMemo } from "react";
import { usePodcast } from "@/context/use-podcast";
import { useActiveSubtitle } from "@/hooks/use-active-subtitle";
import SubtitleViewer from "./subtitle-view";
import PodcastArt from "./podcast-art";
import PlayBar from "./play-bar";
import { Subtitle } from "@/types/subtitle"; // ✅ make sure this import path matches your structure

export default function FullScreenPlayer() {
  const { isFullScreen, setIsFullScreen, activePodcast, audioRef } = usePodcast();
  const [currentTime, setCurrentTime] = useState(0);

  const subtitles: Subtitle[] = useMemo(() => {
    if (!activePodcast?.srt) return [];

    // Transform array-of-arrays into consistent Subtitle objects
    return activePodcast.srt.map((entry: any, index: number): Subtitle => {
      const startTime = entry.find((x: any) => x[0] === "start")?.[1] || 0;
      const endTime = entry.find((x: any) => x[0] === "end")?.[1] || 0;
      const text = entry.find((x: any) => x[0] === "word")?.[1] || "";
      return { id: index, startTime, endTime, text };
    });
  }, [activePodcast?.srt]);

  const activeSubtitleId = useActiveSubtitle(subtitles, currentTime);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audioRef]);

  const handleSubtitleClick = (startTime: number) => {
    if (audioRef?.current) audioRef.current.currentTime = startTime;
  };

  if (!isFullScreen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-secondary-background flex p-30 flex-col lg:flex-row">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center justify-start pb-10">
        <PodcastArt picture={activePodcast?.picture} title={activePodcast?.title} />
        <div className="text-center text-secondary-text max-w-[80%] mt-2">
          <h1 className="text-2xl font-bold mb-1">{activePodcast?.title}</h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 text-secondary-text p-10 overflow-hidden flex flex-col justify-center">
        <SubtitleViewer
          subtitles={subtitles}
          activeSubtitleId={activeSubtitleId}
          currentTime={currentTime}
          onSubtitleClick={handleSubtitleClick}
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 hidden lg:block">
        <PlayBar />
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white text-xl hover:opacity-80 transition-opacity"
        onClick={() => setIsFullScreen(false)}
      >
        ✕
      </button>
    </div>
  );
}
