"use client"

import { Award, Users, BadgeCheck, AlertTriangle, BarChart2 } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Compétences et polyvalence"
        description="Matrice de compétences, habilitations et plan de polyvalence"
        icon={Award}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Collaborateurs"
          value={48}
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Habilitations actives"
          value={134}
          icon={BadgeCheck}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Expirées"
          value={6}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Taux polyvalence"
          value="73 %"
          icon={BarChart2}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Award className="h-8 w-8 text-gray-400" />
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
