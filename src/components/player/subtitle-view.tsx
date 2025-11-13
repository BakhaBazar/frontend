"use client";
import React, { useEffect, useRef } from "react";
import { Subtitle } from "@/types/subtitle";

interface SubtitleViewerProps {
  subtitles: Subtitle[];
  activeSubtitleId: number | null;
  currentTime: number;
  onSubtitleClick: (startTime: number) => void;
}

export default function SubtitleViewer({
  subtitles,
  activeSubtitleId,
  currentTime,
  onSubtitleClick,
}: SubtitleViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeRef.current;
      const scrollTo =
        active.offsetTop - container.clientHeight / 2 + active.clientHeight / 2;
      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }, [activeSubtitleId]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto pr-4">
      <div className="flex flex-wrap gap-x-3 gap-y-4">
        {subtitles.map((subtitle) => {
          const isActive = subtitle.id === activeSubtitleId;
          const isPast = currentTime > subtitle.endTime;

          return (
            <span
              key={subtitle.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSubtitleClick(subtitle.startTime)}
              className={`text-3xl font-roboto font-bold cursor-pointer transition-all leading-relaxed duration-300
                ${isActive ? "text-white scale-105" : isPast ? "opacity-40" : "opacity-70"}`}
            >
              {subtitle.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
