"use client";
import PlayBarLeft from "./play-bar-left";
import PlayBarCenter from "./play-bar-center";
import PlayBarRight from "./play-bar-right";
import { usePodcast } from "@/context/use-podcast";

export default function PlayBar() {
  const { isFullScreen } = usePodcast();

  return (
    <div
      className={`
        flex flex-col sm:flex-col md:flex-row lg:flex-row align-center
        items-center md:justify-between 
        px-4 py-4 bg-tertiary-background text-secondary-text 
        w-full absolute bottom-0 z-20
        gap-3 sm:gap-4 min-h-24
        transition-all duration-300
        ${!isFullScreen 
          ? "rounded-b-xl" 
          : "shadow-[0_-4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_-8px_25px_rgba(0,0,0,0.4)] hover:bg-tertiary-background/95"
        }
      `}
    >
      <PlayBarLeft />
      <PlayBarCenter />
      <PlayBarRight />
    </div>
  );
}
