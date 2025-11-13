"use client";
import React from "react";

interface Source {
  name: string;
  url: string;
}

export default function SourceViewer() {
  const sources: Source[] = [
    { name: "Wikimedia Foundation — Lakhey", url: "https://en.wikipedia.org/wiki/Lakhey" },
    { name: "Google Arts & Culture — Lakhe Dance of Nepal", url: "https://artsandculture.google.com/story/infamous-but-captivating-lakhe-dance-of-nepal" },
    { name: "YouTube — Traditional Lakhe of Eastern Nepal", url: "https://www.youtube.com/watch?v=example" },
    { name: "Csorg — A Demon Among Deities", url: "https://example.com/demon-among-deities" },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center p-4 bg-transparent">
      {sources.map((src, i) => (
        <div
          key={i}
          className="rounded-full bg-primary-background text-xs/tight border border-highlight shadow-md px-4 py-3 w-fit hover:bg-secondary-background transition-all duration-200"
        >
          <a
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline text-sm underline-offset-2 hover:text-blue-300 transition-colors"
          >
            {src.name}
          </a>
        </div>
      ))}
    </div>
  );
}
