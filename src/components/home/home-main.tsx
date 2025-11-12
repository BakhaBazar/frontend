"use client"

import React, { useEffect, useState } from "react"
import Podcasts from "./podcast-row"
import { podcast, PodcastType } from "@/types/models/podcast"
import { usePodcastBackend } from "@/hooks/use-podcast-backend"

interface HomeMainProps {
    rows: podcast[],
    type: PodcastType
}

function HomeMain({ rows, type }: HomeMainProps) {

    const { get_podcast } = usePodcastBackend();

    const [displayRows, setDisplayRows] = useState<podcast[]>(rows);

    const [open, setOpen] = useState<"Stories" | "Legends" | "Entities">("Stories")

    const [ rtype, setrType ] = useState<PodcastType>(type)

    useEffect(() => {
        const fetchRows = async () => {
            if (open === "Stories") {
                const result = await get_podcast("story");
                setrType("story")
                setDisplayRows(result)
            } else if (open === "Legends") {
                const result = await get_podcast("legend");
                setrType("legend")
                setDisplayRows(result);
            } else if ( open === "Entities" ) {
                setrType("entity")
                const result = await get_podcast("entity");
                setDisplayRows(result);
            }
        };
        fetchRows();
    }, [open]);

    const row_top = displayRows.slice(0, 9);

    const row_bottom = displayRows.slice(9, 19);

    return (
        <div className="px-2 lg:px-4 md:p-4 flex flex-col gap-4">
            <div className="heading">
                <div className="flex gap-2">
                    {["Stories" , "Legends" , "Entities"].map((tab) => (
                        <button
                            key={tab}
                            className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${open === tab
                                ? "bg-secondary-button-background text-secondary-button-foreground"
                                : "bg-primary-button-background text-primary-button-foreground hover:bg-primary-button-background/80 "
                                }`}
                            onClick={() => setOpen(tab as "Stories" | "Legends" | "Entities")}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="row-1 mt-2 px-3">
                <Podcasts podcasts={row_top} type={rtype}/>
                
                <Podcasts podcasts={row_bottom} type={rtype} />
            </div>
        </div>
    )
}

export default HomeMain
