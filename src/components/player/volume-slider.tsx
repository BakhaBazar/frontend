"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function VolumeSlider() {
  const [volume, setVolume] = useState(75);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    // Example: adjust audio volume here
    const audio = document.querySelector("audio");
    if (audio) audio.volume = newVolume / 100;
  };

  return (
    <div className="flex items-center gap-2 w-32">
      <Slider
        value={[volume]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className="[&_[role=slider]]:bg-highlight-light [&_[role=slider]]:border-0"
      />
    </div>
  );
}
