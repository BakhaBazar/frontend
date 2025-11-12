"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"
import { User as UserIcon } from "lucide-react" // 👈 import a default icon


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function NavUser({
  user,
  logout
}: {
  user: {
    name: string
    email: string
    avatar: string
  },
  logout: () => void
}) {
  const { state } = useSidebar()
  const router = useRouter()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {state === "expanded" ? (
              // Expanded: Avatar + name + email
              <SidebarMenuButton className="bg-accent h-20 px-4 py-3 rounded-xl hover:bg-accent/80 transition-colors mt-5 mb-2">
                <Avatar className="h-10 w-10 rounded-lg bg-white">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="rounded-lg text-black flex items-center justify-center">
                      <UserIcon className="h-5 w-5" /> {/* 👈 Lucide icon as default */}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-gray-400">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
              </SidebarMenuButton>
            ) : (
              // Collapsed: Only avatar (centered)
              <SidebarMenuButton className="bg-accent h-12 w-12 rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors mt-5 mb-2">
                <Avatar className="h-8 w-8 rounded-full bg-white">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="rounded-full text-black flex items-center justify-center">
                      <UserIcon className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>

          {/* Dropdown (same for both states) */}
          <DropdownMenuContent
            className="min-w-56 rounded-xl border border-gray-800 bg-accent shadow-lg"
            side="right"
            align="end"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-3 font-normal">
              <div className="flex items-center gap-3 text-sm">
                <Avatar className="h-8 w-8 rounded-full bg-white">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="rounded-full text-black flex items-center justify-center">
                      <UserIcon className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <Sparkles className="h-4 w-4 text-white" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors"
                onClick={() => router.push("/account")}

              >
                <BadgeCheck className="h-4 w-4 text-white" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <CreditCard className="h-4 w-4 text-white" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors"
                onClick={() => router.push("/settings")}

              >
                <Settings className="h-4 w-4 text-white" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 text-red-400" />
              <span>Log out</span>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
