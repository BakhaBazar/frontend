"use client"

import { useState } from "react"
import { Bell, CheckCircle, MessageSquare, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationsBell() {
  const [open, setOpen] = useState(false)

  const notifications = [
    { 
      id: 1, 
      type: "message", 
      text: "You have a new message from Alex", 
      icon: MessageSquare, 
      time: "2m ago" 
    },
    { 
      id: 2, 
      type: "alert", 
      text: "Server downtime scheduled at 2 AM", 
      icon: AlertCircle, 
      time: "1h ago" 
    },
    { 
      id: 3, 
      type: "success", 
      text: "Your payment was successful!", 
      icon: CheckCircle, 
      time: "Yesterday" 
    },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full relative transition ${
            open ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
          } cursor-pointer`}
        >
          <Bell className="h-5 w-5 text-highlight-light" />
          {/* Red dot if there are notifications */}
          {notifications.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-72 rounded-xl border border-gray-800 bg-accent shadow-lg"
        side="left"
        align="start"
        alignOffset={15}
        sideOffset={6}
      >
        <DropdownMenuLabel className="p-3 font-medium text-sm">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-700" />

        {notifications.length > 0 ? (
          notifications.map((n) => {
            const Icon = n.icon
            return (
              <DropdownMenuItem
                key={n.id}
                className="flex items-start gap-3 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <Icon className="h-4 w-4 mt-0.5 text-white" />
                <div className="flex flex-col text-sm">
                  <span>{n.text}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
              </DropdownMenuItem>
            )
          })
        ) : (
          <div className="p-3 text-sm text-gray-400 text-center">
            No new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
