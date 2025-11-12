"use client"

import { podcast } from "@/types/models/podcast";


const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL


export function usePodcastBackend() {

    const get_podcast = async ( type: string ) => {
        if ( type === "all" ) type = "story";
        const url = `${API_BASE_URL}/api/${type}/`;
        
        const res = await fetch(url);

        const podcasts: podcast[] = res.ok ? await res.json() : [];

        return podcasts
    }

    return {
        get_podcast
    }
}
