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
  ListTodo,
  MessageSquareWarning,
  Truck,
  GraduationCap,
  Wrench,
} from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: "Pilotage",
    items: [
      { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
      { name: "Indicateurs", href: "/indicators", icon: BarChart2 },
      { name: "Plan d'actions", href: "/action-plan", icon: ListTodo },
    ],
  },
  {
    title: "Qualité",
    items: [
      { name: "Documents", href: "/documents", icon: FileText },
      { name: "Non-Conformités", href: "/non-conformances", icon: AlertTriangle },
      { name: "CAPA", href: "/capa", icon: CheckSquare },
      { name: "Réclamations", href: "/complaints", icon: MessageSquareWarning },
      { name: "Audits", href: "/audits", icon: ClipboardList },
    ],
  },
  {
    title: "Risques & Conformité",
    items: [
      { name: "Risques", href: "/risks", icon: ShieldAlert },
      { name: "Fournisseurs", href: "/suppliers", icon: Truck },
    ],
  },
  {
    title: "Ressources",
    items: [
      { name: "Formations", href: "/training", icon: GraduationCap },
      { name: "Équipements", href: "/equipment", icon: Wrench },
    ],
  },
]

const allItems = navGroups.flatMap((g) => g.items)

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    onMobileClose?.()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const renderItem = (item: NavItem) => (
    <Link
      key={item.name}
      href={item.href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive(item.href)
          ? "bg-blue-600 text-white shadow-sm"
          : "text-gray-300 hover:bg-gray-800 hover:text-white",
        collapsed && "justify-center px-2"
      )}
      title={collapsed ? item.name : undefined}
    >
      <item.icon className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
      {!collapsed && <span className="truncate">{item.name}</span>}
    </Link>
  )

  const groupedNav = (
    <nav className="flex-1 space-y-4 overflow-y-auto p-3">
      {navGroups.map((group) => (
        <div key={group.title} className="space-y-1">
          {!collapsed && (
            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              {group.title}
            </p>
          )}
          {group.items.map(renderItem)}
        </div>
      ))}
    </nav>
  )

  // Flat nav (mobile drawer always expanded)
  const flatNav = (
    <nav className="flex-1 space-y-4 overflow-y-auto p-3">
      {navGroups.map((group) => (
        <div key={group.title} className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            {group.title}
          </p>
          {group.items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile overlay */}
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
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 shrink-0 text-blue-400" />
            <span className="ml-3 truncate text-lg font-bold">QualiSafe</span>
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {flatNav}
        <div className="border-t border-gray-800 p-4">
          <p className="text-xs text-gray-500">QHSE Manager v1.0</p>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "relative hidden flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out md:flex",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-4">
          <Shield className="h-8 w-8 shrink-0 text-blue-400" />
          {!collapsed && (
            <span className="ml-3 truncate text-lg font-bold">QualiSafe</span>
          )}
        </div>

        {groupedNav}

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
          <div className="border-t border-gray-800 p-4">
            <p className="text-xs text-gray-500">QHSE Manager v1.0</p>
          </div>
        )}
      </aside>
    </>
  )
}

export { allItems as navItems }
