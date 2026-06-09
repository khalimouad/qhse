"use client"

import { ShieldCheck, FileText, AlertOctagon, Building2, Truck } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PreventionPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Plan de prévention"
        description="Plans de prévention entreprises extérieures et protocoles de sécurité"
        icon={ShieldCheck}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Plans actifs"
          value={6}
          icon={FileText}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Expirés"
          value={1}
          icon={AlertOctagon}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Entreprises ext."
          value={9}
          icon={Building2}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Protocoles chargement"
          value={4}
          icon={Truck}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
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
