"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/models/user";
import Cookies from "js-cookie";


const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`${API_BASE_URL}/api/login/`, {
                    credentials: "include",
                });

                if (res.ok) {
                    const data: User = await res.json();
                    setIsLoggedIn(true);
                    setUser(data);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    async function logout() {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const res = await fetch(`${API_BASE_URL}/api/logout/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "",
                },
            });

            if (res.ok) {
                setIsLoggedIn(false);
                setUser(null);
                window.location.reload();
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
