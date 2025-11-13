"use client";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

interface CommentCardProps {
    user: string;
    handle: string;
    text: string;
}

const CommentCard = ({ user, handle, text }: CommentCardProps) => {
    return (
        <div className="flex-shrink-0 w-64 bg-light-background-light p-4 rounded-xl text-white">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                </div>        <div>
                    <h4 className="font-bold">{user}</h4>
                    <p className="text-sm text-gray-400">{handle}</p>
                </div>
            </div>
            <p className="text-sm text-gray-300">{text}</p>
        </div>
    );
};

export default function TopComments() {
    const comments = [
        {
            user: "Suyog Prasai",
            handle: "@gamerboy",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
        },
        {
            user: "Jane Doe",
            handle: "@janed",
            text: "This design looks amazing! Loving the colors and style!",
        },
        {
            user: "John Smith",
            handle: "@jsmith",
            text: "Spotify-inspired layout with scrolling comments is 🔥🔥🔥",
        },
    ];

    return (
        <div className="w-full bg-neutral-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-6">Top Comments</h2>
            <div className="flex gap-6">
                {/* Left Image */}
                <div className="w-1/3 flex justify-center items-center">
                    <Image
                        src="/home_lakhe.png" // 
                        width={400}
                        height={400}
                        className="w-full h-auto rounded-xl object-contain"
                        priority
                        alt="home lakhe"
                        
                    />
                </div>

                {/* Scrollable Comments */}
                <div className="w-2/3 overflow-x-auto no-scroll">
                    <div className="flex gap-4 items-start">
                        {comments.map((c, i) => (
                            <CommentCard
                                key={i}
                                user={c.user}
                                handle={c.handle}
                                text={c.text}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
