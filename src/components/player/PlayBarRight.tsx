"use client";
import React, { useState } from "react";
import {
    Heart,
    Bookmark,
    AlignJustify,
    Volume2,
    Maximize,
} from "lucide-react";
import { VolumeSlider } from "./volume-slider";
import Cookies from "js-cookie";
import { PodcastType } from "@/types/models/podcast";
import { usePodcast } from "@/context/use-podcast";

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export default function PlayBarRight() {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const csrfToken = Cookies.get("csrftoken");

    const { activePodcast } = usePodcast();
    
    const handleLike = async () => {
        // Prevent spamming
        if (loading) return;
        if (loading || !activePodcast) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/save/like/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || ""
                },
                credentials: "include",
                body: JSON.stringify({
                    content_type: activePodcast.type,
                    uuid: activePodcast.uuid
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send like: ${response.status}`);
            }

            // Toggle state only if the request succeeds
            setLiked(!liked);
        } catch (error) {
            console.error("Error liking podcast:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-end hidden lg:flex">
            <Heart
                size={24}
                fill={liked ? "currentColor" : "none"}
                className={`text-primary-button-foreground transition-colors cursor-pointer flex-shrink-0 ${liked ? "text-red-500" : "text-primary-button-foreground"
                    } ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-highlight"}`}
                onClick={handleLike}
            />
            <Bookmark className="h-5 w-5 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
            <AlignJustify className="h-5 w-5 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
            <Volume2 className="h-5 w-5 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
            <div className="hidden md:block">
                <VolumeSlider />
            </div>
            <Maximize className="h-5 w-5 text-primary-button-foreground cursor-pointer hover:text-primary-button-foreground" />
        </div>
    );
}
