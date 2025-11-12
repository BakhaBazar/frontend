"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PlayCircle,
  Clock,
  Calendar,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const spotlightData = [
  {
    id: 1,
    title: "The Tale of the Big Foot",
    date: "24th Dec, 2025",
    duration: "24 min",
    category: "Legend",
    description:
      "The Bigfoot, a towering mystery of forests, inspires legends. Hidden in shadows, it roams silently, leaving giant footprints and endless questions about nature's greatest untold secret.",
    image:
      "/spotlight/1.jpg",
  },
  {
    id: 2,
    title: "Secrets of the Ocean",
    date: "15th Jan, 2026",
    duration: "32 min",
    category: "Nature",
    description:
      "Dive deep into the mysteries of the ocean, uncovering creatures and phenomena that remain hidden beneath the waves.",
    image:
      "/spotlight/2.jpg",
  },
];

function SpotlightSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirstRender = useRef(true);

  // Auto-play every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightData.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % spotlightData.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? spotlightData.length - 1 : prev - 1
    );

  const current = spotlightData[currentIndex];

  // After first render, mark as false
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div className="relative text-white min-h-[400px] overflow-hidden lg:ml-4">
      {/* Background Image Animation */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={isFirstRender.current ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={isFirstRender.current ? undefined : { opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${current.image})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex justify-between mt-auto h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-content"}
            initial={isFirstRender.current ? false : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={isFirstRender.current ? undefined : { opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="lg:max-w-xl w-[90%] flex flex-col justify-end lg:pb-10"
          >
            <p className="text-xs text-secondary-text mb-1">
              # {current.id} Spotlight
            </p>
            <h2 className="text-3xl font-bold mb-2 text-secondary-text">{current.title}</h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-secondary-text mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {current.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> {current.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {current.date}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-secondary-text mb-4">{current.description}</p>

            {/* Button */}
            <button className="flex items-center w-40 gap-2 bg-secondary-button-background text-secondary-button-foreground cursor-pointer font-semibold px-4 py-2 rounded-full hover:bg-secondary-button-background/95">
              <PlayCircle className="w-5 h-5" /> Listen Now
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows in column */}
      <div className="absolute right-4 top-2/3 -translate-y-1/2 flex flex-col gap-2 z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-secondary-button-background hover:bg-secondary-button-background/95 rounded-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-secondary-button-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-secondary-button-background hover:bg-secondary-button-background/95 rounded-sm cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 text-secondary-button-foreground" />
        </button>
      </div>
    </div>
  );
}

export default SpotlightSlider;
