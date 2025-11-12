"use client"

import { Plus, Feather, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function CommunityHeader() {
  const { state } = useSidebar()

  return (
    <div className="community-header px-3 mb-3">
      {state === "expanded" ? (
        // Expanded layout: Trigger + Title left, Create button right
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h2 className="text-base font-semibold">Community</h2>
          </div>

          {/* Expanded Create Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-highlight text-sm font-bold text-white shadow-sm hover:bg-highlight/90"
              >
                <Plus className="w-4 h-4 text-primary-button-foreground" />
                <span>Create</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownContent />
          </DropdownMenu>
        </div>
      ) : (
        // Collapsed layout: Trigger on top, + button below
        <div className="flex flex-col items-center gap-2">
          <SidebarTrigger />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-highlight text-white hover:bg-highlight/90 transition-colors">
                <Plus className="w-4 h-4 text-primary-button-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownContent />
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}

function DropdownContent() {

  const router = useRouter()

  return (
    <DropdownMenuContent
      align="start"
      side="right"
      sideOffset={6}
      className="w-72 rounded-xl border border-gray-800 bg-accent shadow-lg p-1"
    >
      <DropdownMenuLabel className="px-3 py-2 text-xs text-gray-400">
        Choose type
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gray-700" />

      {/* Option 1: AI Prompting */}
      <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors"
        onClick={() => router.push("/ai")}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="font-medium text-white">AI Prompting</span>
        </div>
        <span className="text-xs text-gray-400 leading-snug wrap-break-word">
          Let AI help you generate ideas, drafts, or inspiration.
        </span>
      </DropdownMenuItem>

      {/* Option 2: Write by Yourself */}
      <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors"
        onClick={() => router.push("/write")}
      >
        <div className="flex items-center gap-2">
          <Feather className="h-4 w-4 text-white" />
          <span className="font-medium text-white">Write by Yourself</span>
        </div>
        <span className="text-xs text-gray-400 leading-snug break-words">
          Create your own content using text or voice input.
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
