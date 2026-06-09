"use client"

import { FlaskConical, Package, Biohazard, FileCheck, ArrowLeftRight } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ChemicalRisksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Risques chimiques"
        description="Inventaire et évaluation des produits chimiques dangereux"
        icon={FlaskConical}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Produits référencés"
          value={42}
          icon={Package}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Produits CMR"
          value={5}
          icon={Biohazard}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="FDS à jour"
          value={38}
          icon={FileCheck}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Substitutions planifiées"
          value={3}
          icon={ArrowLeftRight}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
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
