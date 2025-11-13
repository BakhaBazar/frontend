"use client"

import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { podcast } from "@/types/models/podcast"

type PodcastContextType = {
  activePodcast: podcast | null
  setActivePodcast: (podcast: podcast | null) => void

  isFullScreen: boolean
  setIsFullScreen: (isFullScreen: boolean) => void

  audioRef: React.RefObject<HTMLAudioElement | null>

  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void

  currentTime: number
  setCurrentTime: (time: number) => void

  duration: number
  setDuration: (duration: number) => void
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
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // --- Pause playback when activePodcast changes ---
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Stop playback
    audio.pause()
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    // Reset audio source to the new podcast if available
    if (activePodcast?.audio) {
      audio.src = activePodcast.audio
    } else {
      audio.removeAttribute("src")
    }
  }, [activePodcast])

  return (
    <PodcastContext.Provider
      value={{
        activePodcast,
        setActivePodcast,
        isFullScreen,
        setIsFullScreen,
        audioRef,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
      }}
    >
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
