"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  ShieldAlert,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
} from "lucide-react"

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Non-Conformités", href: "/non-conformances", icon: AlertTriangle },
  { name: "CAPA", href: "/capa", icon: CheckSquare },
  { name: "Audits", href: "/audits", icon: ClipboardList },
  { name: "Risques", href: "/risks", icon: ShieldAlert },
  { name: "Indicateurs", href: "/indicators", icon: BarChart2 },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    onMobileClose?.()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const navItems = (
    <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
      {navigation.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? item.name : undefined}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-400 shrink-0" />
            <span className="ml-3 text-lg font-bold text-white truncate">QualiSafe</span>
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {navItems}
        <div className="border-t border-gray-700 p-4">
          <p className="text-xs text-gray-500">QHSE Manager v1.0</p>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "relative hidden md:flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-700 px-4">
          <Shield className="h-8 w-8 text-blue-400 shrink-0" />
          {!collapsed && (
            <span className="ml-3 text-lg font-bold text-white truncate">QualiSafe</span>
          )}
        </div>

        {navItems}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>

        {!collapsed && (
          <div className="border-t border-gray-700 p-4">
            <p className="text-xs text-gray-500">QHSE Manager v1.0</p>
          </div>
        )}
      </aside>
    </>
  )
}
