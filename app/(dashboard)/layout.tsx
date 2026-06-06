"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

const pageTitles: Record<string, string> = {
  "/": "Tableau de bord",
  "/documents": "Documents",
  "/documents/new": "Nouveau document",
  "/non-conformances": "Non-Conformités",
  "/non-conformances/new": "Nouvelle Non-Conformité",
  "/capa": "CAPA",
  "/capa/new": "Nouvelle CAPA",
  "/audits": "Audits",
  "/audits/new": "Nouvel Audit",
  "/risks": "Registre des Risques",
  "/indicators": "Indicateurs",
}

function getTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.startsWith("/documents/")) return "Détail Document"
  if (pathname.startsWith("/non-conformances/")) return "Détail Non-Conformité"
  if (pathname.startsWith("/capa/")) return "Détail CAPA"
  if (pathname.startsWith("/audits/")) return "Détail Audit"
  return "QHSE"
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const title = getTitle(pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={title}
          userEmail="admin@qhse.fr"
          onMenuToggle={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
