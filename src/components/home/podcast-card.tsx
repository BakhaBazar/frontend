"use client";

import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { podcast, PodcastType } from "@/types/models/podcast";
import { usePodcast } from "@/context/use-podcast";
import capitalizeTitle from "@/helper/capitaliseTitle";
import getInitials from "@/helper/getInitials";
import { getSpecificPodcast } from "@/lib/getSepcificPodcast";

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

interface PodcastCardProps {
  podcast: podcast;
  type: PodcastType;
}

export default function PodcastCard({ podcast, type }: PodcastCardProps) {
  const { setActivePodcast, setIsPlaying } = usePodcast();

  const handlePlayClick = async () => {
    try {
      const specificPodcast = await getSpecificPodcast({
        uuid: podcast.uuid,
        type: type,
      });
      setActivePodcast({ ...specificPodcast });
      console.log(specificPodcast);
    } catch (error) {
      console.error("Failed to play podcast:", error);
    }
  };


  return (
    <div
      className="shrink-0 w-46 cursor-pointer p-3 rounded-md hover:bg-highlight transition group"
      onClick={handlePlayClick}
    >
      {/* Image container */}
      <div className="relative aspect-square w-full rounded-md overflow-hidden flex items-center justify-center">
        {podcast.picture ? (
          <Image
            src={API_BASE_URL + podcast.picture}
            alt={capitalizeTitle(podcast?.title || "Podcast")}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-md"
            unoptimized
            
          />
        ) : (
          <Image
            src={"/icons/ai.png"}
            alt={capitalizeTitle(podcast?.title || "Podcast")}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-md"
            unoptimized
          />
        )}

        {/* Play Button */}
        <button
          className="cursor-pointer absolute bottom-2 right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          onClick={() => {setIsPlaying(true)}}
        >
          <Play className="text-black fill-black" size={20} />
        </button>
      </div>

      {/* Podcast Info */}
      <p className="mt-3 text-white font-medium text-sm truncate">
        {capitalizeTitle(podcast.title || podcast.name || "")}
      </p>
      <p className="text-highlight-semilight text-xs truncate">
        @{podcast.author}
      </p>
    </div>
  );
}
