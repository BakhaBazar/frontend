"use client";
import React, { useRef, useEffect, useState } from "react";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxWidth?: string; // accepts Tailwind-compatible width (e.g. "160px" or "10rem")
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className = "",
  speed = 10,
  maxWidth = "160px",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (container && textEl) {
      setIsOverflowing(textEl.scrollWidth > container.clientWidth);
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      style={{ maxWidth }}
    >
      <span
        ref={textRef}
        className={`inline-block ${isOverflowing ? "animate-marquee" : "truncate"}`}
        style={isOverflowing ? { animationDuration: `${speed}s` } : {}}
      >
        {text}
      </span>
      {isOverflowing && (
        <span
          className="inline-block animate-marquee"
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          &nbsp;&nbsp;&nbsp;{text}
        </span>
      )}
    </div>
  );
};

export default MarqueeText;