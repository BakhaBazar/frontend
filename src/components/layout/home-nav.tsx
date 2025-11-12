"use client"

import { Home, Search } from "lucide-react"
import { NotificationsBell } from "./notification-bell"
import Link from "next/link"
import { useAuth } from "@/context/use-auth"
import { useRouter } from "next/navigation";


function HomeNav() {
  const { isLoggedIn } = useAuth()
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/home")
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  return (
    <div className="flex items-center justify-between bg-tertiary-background px-4 py-3 rounded-t-xl min-h-22">
      <div className="hidden lg:block"></div>

      {/* Middle section with Home + Search */}
      <div className="flex items-center gap-3 w-1/2 max-w-lg justify-start lg:justify-center">
        {/* Home Icon */}
        <Link href="/home" passHref>
          <button
            onClick={handleClick}
            className="
          flex items-center justify-center 
          w-10 h-10 rounded-full p-1 
          hover:bg-[#2a2a2a] 
          transition cursor-pointer ml-5 lg:ml-0
        "
          >
            <Home className="h-7 w-7 text-highlight-light" />
          </button>
        </Link>

        {/* Search Input */}
        <div className="hidden lg:flex items-center bg-secondary-background px-4 py-3 rounded-full w-full">
          <Search className="h-5 w-5 text-highlight-light mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-primary-text w-full placeholder-highlight-light"
          />
        </div>

      </div>

      <div className="flex items-center mr-10 gap-5">
        {/* Show Sign up only if NOT logged in */}
        {!isLoggedIn && (
          <div className="flex items-center gap-5">

            <Link href="/login" passHref>
              <button
                className="px-4 py-2 rounded-full bg-highlight-light text-black font-medium 
                 hover:opacity-90 hover:scale-105 hover:shadow-lg 
                 transition transform duration-200 cursor-pointer"
              >
                Log In
              </button>
            </Link>
          </div>
        )}

        {/* Right - Notifications (only if logged in maybe?) */}
        {isLoggedIn && <NotificationsBell />}
      </div>
    </div>
  )
}

export default HomeNav
