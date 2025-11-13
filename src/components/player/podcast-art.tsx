"use client";
interface PodcastArtProps {
  picture?: string;
  title?: string;
}

export default function PodcastArt({ picture, title }: PodcastArtProps) {

  return (
    <img
      src={picture || "/icons/thrilling.png"}
      alt={title}
      className="
        max-h-[60%]
        rounded-2xl
        object-cover
        shadow-xl
        transition-transform
        duration-300
        hover:scale-[1.02]
      "
    />
  );
}
