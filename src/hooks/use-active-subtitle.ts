"use client";
import { useEffect, useState } from "react";
import { Subtitle } from "@/types/subtitle";

export function useActiveSubtitle(subtitles: Subtitle[], currentTime: number) {
  const [activeSubtitleId, setActiveSubtitleId] = useState<number | null>(null);

  useEffect(() => {
    const active = subtitles.find(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    );
    setActiveSubtitleId(active?.id ?? null);
  }, [currentTime, subtitles]);

  return activeSubtitleId;
}
