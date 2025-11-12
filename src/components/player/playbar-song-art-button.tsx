"use client";

import React from "react";
import Image from "next/image";
import getInitials from "@/helper/getInitials";

interface ScrollImageProps {
  src?: string;            // optional — podcast image source
  alt?: string;            // optional — alt text for image
  size?: number;           // optional — image size (default: 48)
  title?: string;          // optional — used to generate initials if no image
  name?: string;           // optional — alternative to title
}

const ScrollImage: React.FC<ScrollImageProps> = ({
  src = "",
  alt = "Podcast Art",
  size = 48,
  title = "",
  name = "",
}) => {
  const handleScroll = (): void => {
    const section = document.getElementById("home-main");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const initials = getInitials(title || name || "Podcast");

  return (
    <button onClick={handleScroll} className="flex-shrink-0">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-md object-cover cursor-pointer"
          unoptimized
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-md bg-gradient-to-br 
                     from-accent-primary via-color-tertiary to-accent-secondary 
                     text-white text-2xl font-bold shadow-md border border-white/20"
          style={{ width: size, height: size }}
        >
          {initials}
        </div>
      )}
    </button>
  );
};

export default ScrollImage;
