"use client"

import React, { createContext, useContext, useState } from "react"
import { podcast, PodcastType } from "@/types/models/podcast"

type PodcastContextType = {
  activePodcast: podcast | null
  setActivePodcast: (podcast: podcast | null) => void
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined)

export function PodcastProvider({
  children,
  initialPodcast = null,
}: {
  children: React.ReactNode
  initialPodcast?: podcast | null
}) {
  const [activePodcast, setActivePodcast] = useState<podcast | null>(initialPodcast)

  return (
    <PodcastContext.Provider value={{ activePodcast, setActivePodcast }}>
      {children}
    </PodcastContext.Provider>
  )
}

export function usePodcast() {

  const context = useContext(PodcastContext)
  if (!context) {
    throw new Error("usePodcast must be used within a PodcastProvider")
  }
  return context
}
