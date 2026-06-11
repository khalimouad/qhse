"use client"

import { useState } from "react"
import { Award, Users, BadgeCheck, AlertTriangle, BarChart2, Search, Filter } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Criticality = "Critique" | "Sensible" | "Maîtrisé" | "Faible impact"

interface ExpertiseRow {
  id: number
  expertise: string
  domaine: string
  porteurPrincipal: string
  nbPorteurs: number
  niveau: number
  criticite: Criticality
  risqueDepart: boolean
  actionCapitalisation: string
}

const expertiseData: ExpertiseRow[] = [
  { id: 1, expertise: "Analyse des risques QHSE (JSA/PHA)", domaine: "Sécurité", porteurPrincipal: "Jean Dupont", nbPorteurs: 3, niveau: 4, criticite: "Critique", risqueDepart: true, actionCapitalisation: "Mentor junior / Guide pratique" },
  { id: 2, expertise: "Gestion des non-conformités ISO 9001", domaine: "Qualité", porteurPrincipal: "Marie Martin", nbPorteurs: 5, niveau: 5, criticite: "Maîtrisé", risqueDepart: false, actionCapitalisation: "Procédure documentée" },
  { id: 3, expertise: "Évaluation des aspects environnementaux", domaine: "Environnement", porteurPrincipal: "Pierre Bernard", nbPorteurs: 2, niveau: 3, criticite: "Sensible", risqueDepart: true, actionCapitalisation: "Entretien de capitalisation" },
  { id: 4, expertise: "Audit interne ISO 14001/45001", domaine: "Audit", porteurPrincipal: "Sophie Moreau", nbPorteurs: 4, niveau: 4, criticite: "Sensible", risqueDepart: false, actionCapitalisation: "Formation interne planifiée" },
  { id: 5, expertise: "Traitement des réclamations clients", domaine: "Qualité", porteurPrincipal: "Luc Petit", nbPorteurs: 6, niveau: 4, criticite: "Maîtrisé", risqueDepart: false, actionCapitalisation: "Base de cas documentée" },
  { id: 6, expertise: "Maîtrise des procédés critiques soudage", domaine: "Production", porteurPrincipal: "Antoine Leblanc", nbPorteurs: 2, niveau: 5, criticite: "Critique", risqueDepart: true, actionCapitalisation: "Vidéos de référence + tutorat" },
  { id: 7, expertise: "Gestion des déchets dangereux", domaine: "Environnement", porteurPrincipal: "Isabelle Rousseau", nbPorteurs: 3, niveau: 3, criticite: "Sensible", risqueDepart: false, actionCapitalisation: "Procédures mises à jour" },
  { id: 8, expertise: "Plan de prévention sous-traitants", domaine: "Sécurité", porteurPrincipal: "Marc Durand", nbPorteurs: 4, niveau: 4, criticite: "Maîtrisé", risqueDepart: false, actionCapitalisation: "Modèle standardisé" },
  { id: 9, expertise: "Pilotage des indicateurs de performance (KPI)", domaine: "Management", porteurPrincipal: "Claire Dubois", nbPorteurs: 3, niveau: 3, criticite: "Sensible", risqueDepart: true, actionCapitalisation: "Dashboard automatisé" },
  { id: 10, expertise: "Revue de direction et reporting QHSE", domaine: "Management", porteurPrincipal: "Thomas Laurent", nbPorteurs: 2, niveau: 5, criticite: "Critique", risqueDepart: false, actionCapitalisation: "Procédure annuelle formalisée" },
]

const LEVEL_LABELS: Record<number, string> = {
  1: "N1 — Sensibilisé",
  2: "N2 — Praticien",
  3: "N3 — Autonome",
  4: "N4 — Expert",
  5: "N5 — Référent",
}

const CRITICALITY_COLORS: Record<Criticality, string> = {
  "Critique": "bg-red-100 text-red-700 border-red-200",
  "Sensible": "bg-amber-100 text-amber-700 border-amber-200",
  "Maîtrisé": "bg-green-100 text-green-700 border-green-200",
  "Faible impact": "bg-gray-100 text-gray-600 border-gray-200",
}

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-gray-100 text-gray-600",
  2: "bg-orange-100 text-orange-700",
  3: "bg-amber-100 text-amber-700",
  4: "bg-blue-100 text-blue-700",
  5: "bg-green-100 text-green-700",
}

type FilterValue = "all" | Criticality

export default function SkillsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterValue>("all")

  const filtered = expertiseData.filter((row) => {
    const matchSearch = `${row.expertise} ${row.domaine} ${row.porteurPrincipal}`.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || row.criticite === filter
    return matchSearch && matchFilter
  })

  const critiques = expertiseData.filter((r) => r.criticite === "Critique").length
  const risqueDepart = expertiseData.filter((r) => r.risqueDepart).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compétences et polyvalence"
        description="Cartographie des expertises critiques et plan de capitalisation des savoirs"
        icon={Award}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Expertises cartographiées" value={expertiseData.length} icon={Award} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <StatCard title="Expertises critiques" value={critiques} icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-50" />
        <StatCard title="Risque départ" value={risqueDepart} icon={Users} iconColor="text-amber-600" iconBg="bg-amber-50" hint="experts à risque" />
        <StatCard title="Taux couverture" value="73 %" icon={BarChart2} iconColor="text-green-600" iconBg="bg-green-50" hint="polyvalence moyenne" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Cartographie des expertises</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher une expertise..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["all", "Critique", "Sensible", "Maîtrisé", "Faible impact"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="text-xs"
                >
                  {f === "all" ? "Tous" : f}
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600">
                  <th className="px-4 py-3">Expertise</th>
                  <th className="px-4 py-3">Domaine</th>
                  <th className="px-4 py-3">Porteur principal</th>
                  <th className="px-4 py-3 text-center">Porteurs</th>
                  <th className="px-4 py-3">Niveau</th>
                  <th className="px-4 py-3">Criticité</th>
                  <th className="px-4 py-3 text-center">Risque départ</th>
                  <th className="px-4 py-3">Action capitalisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{row.expertise}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{row.domaine}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700">{row.porteurPrincipal}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                        {row.nbPorteurs}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[row.niveau]}`}>
                        N{row.niveau}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${CRITICALITY_COLORS[row.criticite]}`}>
                        {row.criticite}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.risqueDepart ? (
                        <AlertTriangle className="mx-auto h-4 w-4 text-amber-500" />
                      ) : (
                        <BadgeCheck className="mx-auto h-4 w-4 text-green-500" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600">{row.actionCapitalisation}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">
                      Aucune expertise correspondante.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
