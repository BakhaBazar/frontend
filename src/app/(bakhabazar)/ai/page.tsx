"use client";
import React, { useState, useEffect, useRef } from "react";
import { Loader2, Send, Mic, Plus } from "lucide-react";
import { useAuth } from "@/context/use-auth";
import Cookies from "js-cookie";

export default function ArtificialIntelligencePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [response, setResponse] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { user, isLoggedIn } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const url = API_BASE_URL + "/api/ai/";

  const userName = isLoggedIn && user ? user.fullname : "Guest";
  const firstName = userName.match(/^[^\s]+/)?.[0] || "Guest";
  const csrfToken = Cookies.get("csrftoken");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setElapsed(0);
    setResponse("");

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      if (data?.title && data?.content) {
        setResponse(`${data.title} successfully created \n\n ${data.content}`);
      } else {
        setResponse("No response from AI.");
      }
    } catch (error) {
      console.error(error);
      setResponse("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setInput("");
    }
  };

  // Clean up timer if component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-16rem)] px-4">
      {/* Loading screen */}
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary-background/90 backdrop-blur-md z-10">
          <Loader2 className="w-14 h-14 text-primary-text mb-4 animate-spin" />
          <p className="text-md text-secondary-text font-medium mb-2">
            Getting your AI response...
          </p>
          <p className="text-sm text-primary-text/70">
            Elapsed time: {elapsed}s
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-secondary-text mb-6">
            Good to see you, {firstName}.
          </h1>

          <div className="flex items-center bg-input-background border border-highlight rounded-xl px-4 py-3 shadow-md">
            <Plus className="text-secondary-text w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Ask about local cultures, history, and more..."
              className="flex-1 bg-transparent text-white placeholder-primary-text/50 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Mic className="text-primary-text w-5 h-5 mx-3" />
            <button
              onClick={handleSubmit}
              className="w-8 h-8 flex items-center justify-center bg-primary-button-background hover:bg-primary-button-background/80 text-white rounded-full transition"
            >
              <Send size={16} />
            </button>
          </div>

          {response && (
            <div className="mt-6 p-4 bg-secondary-background border border-highlight rounded-xl text-left text-secondary-text shadow-md max-h-60 overflow-y-auto">
              <p className="text-sm leading-relaxed whitespace-pre-line">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
