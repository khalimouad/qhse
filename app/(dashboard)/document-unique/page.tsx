"use client"

import { ShieldCheck, LayoutGrid, AlertTriangle, ClipboardList, CalendarCheck } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DocumentUniquePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document unique (DUERP)"
        description="Évaluation des risques professionnels et plan de mise à jour"
        icon={ShieldCheck}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Unités de travail"
          value={14}
          icon={LayoutGrid}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Risques inventoriés"
          value={87}
          icon={AlertTriangle}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Actions planifiées"
          value={23}
          icon={ClipboardList}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Mise à jour"
          value="Mars 2026"
          icon={CalendarCheck}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <ShieldCheck className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-600">Module en cours de développement</p>
            <p className="mt-1 text-sm text-gray-400">Les données seront disponibles prochainement.</p>
          </div>
          <Button variant="outline" size="sm">Notifier à la disponibilité</Button>
        </CardContent>
      </Card>
    </div>
  )
}
