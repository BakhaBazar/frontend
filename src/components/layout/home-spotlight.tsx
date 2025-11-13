"use client";
import React from "react";
import Image from "next/image";
import { usePodcast } from "@/context/use-podcast";
import { podcast } from "@/types/models/podcast";
import capitalizeTitle from "@/helper/capitaliseTitle";

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export default function StorySpotlight() {
  const { activePodcast } = usePodcast();

  return (
    <div
      className="
        flex flex-col 
        h-full 
        max-h-[calc(100vh-10rem)] 
        overflow-y-auto 
        p-6
        space-y-6 
        pb-20
        custom-scroll
        px-8
      "
    >
      {/* Story Section */}
      <div>
        <div className="relative w-full h-56 sm:h-72 lg:h-80 xl:h-96">
          <Image
            src={
              activePodcast?.picture
                ? API_BASE_URL + activePodcast.picture
                : "/icons/thrilling.png"
            }
            alt={activePodcast?.title || activePodcast?.name || "Story"}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 80vw, 
         60vw"
            priority
            unoptimized
          />

        </div>
        <h2 className="text-2xl font-bold mt-4 text-secondary">
          {capitalizeTitle(activePodcast?.title || activePodcast?.name || "")}
        </h2>
        <p className="text-primary-button-foreground text-base leading-relaxed mt-2">
          {activePodcast?.synopsis}
        </p>
      </div>

      {/* Entities Section (render only if > 0) */}
      {activePodcast?.entity && activePodcast?.entity.length > 0 && (
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-3 text-highlight-light">
            Entities Mentioned
          </h3>
          <div className="flex flex-col gap-4">
            {activePodcast?.entity.map((entityOne: podcast) => (
              <div
                key={entityOne.uuid}
                className="rounded-xl shadow-md p-3 transition-colors duration-200 hover:bg-highlight cursor-pointer"
              >
                {entityOne.pic && (
                  <div className="relative w-full h-40">
                    <Image
                      src={API_BASE_URL + entityOne.pic}
                      alt={entityOne?.name || "Entity"}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 100vw, 
                             (max-width: 1024px) 50vw, 
                             33vw"
                      unoptimized
                    />
                  </div>
                )}
                <h4 className="text-md font-semibold text-secondary mt-3">
                  {entityOne.name}
                </h4>
                <p className="text-gray-300 text-sm leading-snug">
                  {entityOne.synopsis}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
