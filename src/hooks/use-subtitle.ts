"use client";
import { useEffect, useState } from "react";
import { Subtitle } from "@/types/subtitle";

export function useSubtitles(filePath: string) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubtitles() {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        const data = JSON.parse(text);

        const parsed: Subtitle[] = data.map((entry: any[], index: number) => {
          const obj: Record<string, any> = {};
          entry.forEach(([key, value]) => (obj[key] = value));
          return {
            id: index,
            startTime: obj.start ?? 0,
            endTime: obj.end ?? 0,
            text: obj.word ?? "",
          };
        });

        setSubtitles(parsed);
      } catch (err: any) {
        console.error("Failed to load subtitles:", err);
        setError(err.message);
      }
    }

    loadSubtitles();
  }, [filePath]);

  return { subtitles, error };
}
