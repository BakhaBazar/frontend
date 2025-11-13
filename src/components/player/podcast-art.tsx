"use client";

interface PodcastArtProps {
  picture?: string;
  title?: string;
}

export default function PodcastArt({ picture, title }: PodcastArtProps) {
  return (
    <div
      className="
        relative 
        flex 
        items-center 
        justify-center 
        overflow-hidden 
        rounded-3xl 
        shadow-[0_10px_25px_rgba(0,0,0,0.25)] 
        transition-all 
        duration-500 
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] 
        hover:scale-[0.83]
        scale-[0.8] 
        cursor-pointer
      "
    >
      <img
        src={picture || "/icons/ai.png"}
        alt={title}
        className="
          w-full 
          h-full 
          object-cover 
          rounded-3xl 
          transition-transform 
          duration-500 
          ease-out 
          hover:scale-105 
        "
      />
      <div
        className="
          absolute 
          inset-0 
          bg-linear-to-t 
          from-black/40 
          via-transparent 
          to-transparent 
          rounded-3xl 
          pointer-events-none
        "
      />
    </div>
  );
}
