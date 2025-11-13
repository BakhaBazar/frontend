"use client";
import React from "react";
import ScrollImage from "./playbar-song-art-button";
import MarqueeText from "./marquee-text";
import capitalizeTitle from "@/helper/capitaliseTitle";
import { usePodcast } from "@/context/use-podcast";

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;


export default function PlayBarLeft() {
  const { activePodcast } = usePodcast();

  return (
    <div className="flex items-center gap-3 min-w-0 w-full md:w-auto">
      <ScrollImage
        src={
          activePodcast?.picture
            ? API_BASE_URL + activePodcast.picture
            : "/icons/thrilling.png"
        }
      />
      <div className="flex flex-col min-w-0 overflow-hidden">
        <MarqueeText
          text={capitalizeTitle(
            activePodcast?.title || activePodcast?.name || "No Podcast Selected"
          )}
          className="text-sm font-semibold text-secondary-text"
          maxWidth="260px"
        />
        <MarqueeText
          text={activePodcast?.author || ""}
          className="text-xs text-secondary-text w-full md:max-w-40"
          maxWidth="160px"
        />
      </div>
    </div>
  );
}
