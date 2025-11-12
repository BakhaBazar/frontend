"use client";

import { podcast, PodcastType } from "@/types/models/podcast";

interface SpecificPodcast {
    uuid: string;
    type: PodcastType;
}

export async function getSpecificPodcast({
    uuid,
    type,
}: SpecificPodcast): Promise<podcast & { type: PodcastType }> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

    try {
        const res = await fetch(`${API_BASE_URL}/api/${type}/?uuid=${uuid}`);

        if (!res.ok) {
            throw new Error("Failed to fetch podcast");
        }

        const data = (await res.json()) as podcast;

        return { ...data, type };

    } catch (err) {

        console.error("Error fetching podcast:", err);

        throw err;
    }
}
