"use client"

import { AlertCircle, HardHat, Bell, TrendingDown, BedDouble } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Accidents et incidents"
        description="Déclaration, analyse et suivi des accidents de travail et incidents"
        icon={AlertCircle}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Accidents YTD"
          value={3}
          icon={HardHat}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Incidents déclarés"
          value={18}
          icon={Bell}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Taux de fréquence"
          value={2.4}
          icon={TrendingDown}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Jours perdus"
          value={12}
          icon={BedDouble}
          iconColor="text-gray-600"
          iconBg="bg-gray-100"
        />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <AlertCircle className="h-8 w-8 text-gray-400" />
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
