"use client"

import { useRouter } from "next/navigation"
import { Bell, LogOut, User, Settings, Menu, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  title: string
  userEmail?: string
  onMenuToggle?: () => void
}

export function Header({ title, userEmail = "admin@qhse.fr", onMenuToggle }: HeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    router.push("/login")
  }

  const initials = userEmail.substring(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-white/95 backdrop-blur-sm px-4 md:h-16 md:px-6">
      {/* Left: hamburger (mobile) + brand (mobile) or title (desktop) */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Mobile: show brand logo */}
        <div className="flex items-center gap-2 md:hidden">
          <Shield className="h-6 w-6 text-blue-600 shrink-0" />
          <span className="text-base font-bold text-gray-900">QualiSafe</span>
        </div>
        {/* Desktop: show page title */}
        <h1 className="hidden text-xl font-semibold text-gray-900 md:block truncate">{title}</h1>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-1.5 md:px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-gray-700 md:block">{userEmail}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col">
                <span className="font-semibold">Mon compte</span>
                <span className="text-xs text-gray-500">{userEmail}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 h-4 w-4" />Profil</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
