"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";

interface AudiobookProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
}

export function AudiobookProgress({
  currentTime,
  duration,
  onSeek,
}: AudiobookProgressProps) {
  // Format seconds → M:SS
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Current Time */}
      <span className="text-xs text-primary-button-foreground">
        {formatTime(currentTime)}
      </span>

      {/* Progress Bar */}
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={1}
        onValueChange={(val) => onSeek(val[0])}
        className="
          w-full
          [&_[role=slider]]:h-3 
          [&_[role=slider]]:w-3 
          [&_[role=slider]]:rounded-full 
          [&_[role=slider]]:bg-primary-button-foreground 
          [&_[role=slider]]:border-0 
          [&_[role=slider]]:shadow-none 
          [&_[role=slider]]:translate-y-[-1px]

          [&_[role=track]]:bg-primary-button-foreground 
          [&_[role=track]]:h-1 
          [&_[role=track]]:rounded-full

          [&_[role=range]]:bg-primary-button-foreground 
          [&_[role=range]]:rounded-full
        "
      />

      {/* Total Time */}
      <span className="text-xs text-primary-button-foreground">
        {formatTime(duration)}
      </span>
    </div>
  );
}
