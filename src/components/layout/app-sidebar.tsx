"use client"

import * as React from "react"
import { Bookmark, TrendingUp, Users } from "lucide-react"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import { CommunityHeader } from "./sidebar-community-header"
import { useAuth } from "@/context/use-auth"

const communityItems = [
    { title: "Popular Podcasts", subtitle: "Explore", icon: TrendingUp },
    // { title: "Liked Podcasts", subtitle: "History", icon: Heart },
    { title: "Creators  & Artists", subtitle: "Recent", icon: Users },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar() // "expanded" | "collapsed"
    const { user, isLoggedIn, logout } = useAuth()

    // Fallback values if user is not logged in
    const userName = isLoggedIn && user ? user.fullname : "Guest"
    const userEmail = isLoggedIn && user ? user.email : "guest@example.com"
    // const userAvatar = isLoggedIn && user ? user.avatar : "/default-avatar.png" // Use a default avatar if not available

    return (
        <Sidebar
            {...props}
            className=" pl-5"
            variant="inset"
            collapsible="icon"
        >
            {/* Header */}
            <SidebarHeader className="py-auto flex flex-row items-center">

            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {/* Community Section */}
                <div className="px-2 bg-secondary-background py-5 rounded-xl flex flex-col">
                    <CommunityHeader />
                    <ul className="space-y-2">
                        {communityItems.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition-colors hover:bg-neutral-700"
                                >
                                    <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary-button-background">
                                        <Icon className="w-5 h-5 text-primary-button-foreground" />
                                    </div>

                                    {state === "expanded" && (
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{item.title}</span>
                                            <span className="text-xs text-gray-400">{item.subtitle}</span>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    {/* Bookmarks Section */}
                    <div
                        className={`mt-5 rounded-xl transition-all ${state === "expanded" ? "px-2 bg-accent py-4" : "px-1"
                            }`}
                    >
                        {state === "expanded" && (
                            <h2 className="text-sm font-medium mb-2 px-2">Your Bookmarks</h2>
                        )}

                        <div
                            className={`flex items-center gap-3 cursor-pointer rounded-lg transition-colors hover:bg-neutral-700
                                ${state === "collapsed" ? "justify-center" : "px-2 py-2"}`}>

                            <div className="w-10 h-10 flex items-center justify-center bg-secondary-button-background rounded-lg">
                                <Bookmark className="w-5 h-5 text-secondary-button-foreground" />
                            </div>

                            {state === "expanded" && (
                                <span className="text-sm font-medium">Personal</span>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <NavUser
                    user={{
                        name: userName,
                        email: userEmail,
                        avatar: "",
                    }}

                    logout={logout}
                />
            </SidebarFooter>
        </Sidebar>
    )
}