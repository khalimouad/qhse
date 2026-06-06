"use client"

import { useState } from "react"
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

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-700 px-4">
        <Shield className="h-8 w-8 text-blue-400 shrink-0" />
        {!collapsed && (
          <span className="ml-3 text-lg font-bold text-white truncate">
            QualiSafe
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
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
              <item.icon
                className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")}
              />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse button */}
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

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-gray-700 p-4">
          <p className="text-xs text-gray-500">QHSE Manager v1.0</p>
        </div>
      )}
    </aside>
  )
}
