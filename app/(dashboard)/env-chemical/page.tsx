"use client"

import { FlaskConical, Package, AlertOctagon, Droplets, FileCheck } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EnvChemicalPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Risques chimiques environnementaux"
        description="Gestion des substances dangereuses pour l'environnement"
        icon={FlaskConical}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Substances identifiées"
          value={18}
          icon={Package}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="À risque élevé"
          value={4}
          icon={AlertOctagon}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Déversements YTD"
          value={1}
          icon={Droplets}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Déclarations ICPE"
          value={2}
          icon={FileCheck}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <FlaskConical className="h-8 w-8 text-gray-400" />
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
