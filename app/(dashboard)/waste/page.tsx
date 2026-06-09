"use client"

import { Trash2, Layers, AlertTriangle, FileText, BadgeDollarSign } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WastePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des déchets"
        description="Suivi des flux de déchets, traçabilité et conformité réglementaire"
        icon={Trash2}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Flux de déchets"
          value={12}
          icon={Layers}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Déchets dangereux"
          value={4}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="BSD dématérialisés"
          value="94 %"
          icon={FileText}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Coût traitement"
          value="24 k€"
          icon={BadgeDollarSign}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Trash2 className="h-8 w-8 text-gray-400" />
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
