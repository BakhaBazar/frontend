"use client";
import { usePodcast } from "@/context/use-podcast";

export default function GlobalAudio() {
  const { audioRef, activePodcast } = usePodcast();

  return (
    <audio
      ref={audioRef}
      src={activePodcast?.audio ?? ""}
      preload="auto"
      className="hidden"
    />
  );
}
