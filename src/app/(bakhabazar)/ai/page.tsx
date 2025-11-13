"use client";
import React, { useState } from "react";
import { Loader2, Send, Mic, Plus } from "lucide-react";
import { useAuth } from "@/context/use-auth";

export default function ArtificialIntelligencePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  const userName = isLoggedIn && user ? user.fullname : "Guest";

  // Extract first name safely using regex (handles middle names, spaces, etc.)
  const firstName = userName.match(/^[^\s]+/)?.[0] || "Guest";

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 3000));

    setLoading(false);
    setInput("");
  };

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-16rem)]">
      {/* Loading screen */}
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary-background backdrop-blur-md z-10">
          <Loader2 className="w-14 h-14 text-primary-text mb-4 animate-spin" />
          <p className="text-md text-secondary-text font-medium">
            We are getting your podcast ready, please wait...
          </p>
        </div>
      ) : (
        // Chat box
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-secondary-text mb-8">
            Good to see you, {firstName}.
          </h1>

          <div className="flex items-center bg-input-background border border-highlight rounded-xl px-4 py-3 shadow-md">
            <Plus className="text-secondary-text w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Ask about popular local cultures, history, and more..."
              className="flex-1 bg-transparent text-white placeholder-primary-text/50 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Mic className="text-primary-text w-5 h-5 mx-3" />
            <button
              onClick={handleSubmit}
              className="w-8 h-8 flex items-center justify-center bg-primary-button-background hover:bg-primary-button-background/80 cursor-pointer text-white rounded-full transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
