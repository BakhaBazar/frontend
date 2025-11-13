"use client";
import { useEffect, useState } from "react";
import { usePodcast } from "@/context/use-podcast";
import { useSubtitles } from "@/hooks/use-subtitle";
import { useActiveSubtitle } from "@/hooks/use-active-subtitle";
import SubtitleViewer from "./subtitle-view";
import PodcastArt from "./podcast-art";
import PlayBar from "./play-bar";
import SourceViewr from "./source-view";

export default function FullScreenPlayer() {
  const { isFullScreen, setIsFullScreen, activePodcast, audioRef } = usePodcast();
  const { subtitles } = useSubtitles("/subtitle.txt");
  const [currentTime, setCurrentTime] = useState(0);

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
    <div className="fixed inset-0 z-50 bg-secondary-background flex p-30">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <PodcastArt picture={activePodcast?.picture} title={activePodcast?.title} />
        <div className="text-center text-secondary-text max-w-[80%]">
          <h1 className="text-2xl font-bold mb-3">{activePodcast?.title}</h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 text-secondary-text p-10 overflow-hidden flex flex-col justify-center">

        <SourceViewr />
        
        <SubtitleViewer
          subtitles={subtitles}
          activeSubtitleId={activeSubtitleId}
          currentTime={currentTime}
          onSubtitleClick={handleSubtitleClick}
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0">
        <PlayBar />
      </div>

      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white text-xl hover:opacity-80 transition-opacity"
        onClick={() => setIsFullScreen(false)}
      >
        ✕
      </button>
    </div>
  );
}
