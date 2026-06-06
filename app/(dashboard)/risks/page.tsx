"use client"

import { useState } from "react"
import { Plus, Search, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockRisks = [
  {
    id: "1",
    reference: "R-2024-045",
    title: "Rupture d'approvisionnement matières premières",
    category: "Supply Chain",
    probability: 3,
    impact: 4,
    owner: "Pierre Bernard",
    status: "active",
    treatment: "Diversification des fournisseurs",
  },
  {
    id: "2",
    reference: "R-2024-044",
    title: "Panne équipement critique de production",
    category: "Production",
    probability: 2,
    impact: 5,
    owner: "Jean Dupont",
    status: "active",
    treatment: "Plan de maintenance préventive",
  },
  {
    id: "3",
    reference: "R-2024-043",
    title: "Contamination produit chimique",
    category: "HSE",
    probability: 1,
    impact: 5,
    owner: "Luc Petit",
    status: "treated",
    treatment: "Procédure de manipulation et EPI renforcés",
  },
  {
    id: "4",
    reference: "R-2024-042",
    title: "Non-conformité documentaire lors audit",
    category: "Qualité",
    probability: 3,
    impact: 3,
    owner: "Sophie Moreau",
    status: "active",
    treatment: "Révision système documentaire",
  },
  {
    id: "5",
    reference: "R-2024-041",
    title: "Accident de travail chute de hauteur",
    category: "HSE",
    probability: 2,
    impact: 5,
    owner: "Marie Martin",
    status: "treated",
    treatment: "Formation et équipements anti-chute",
  },
  {
    id: "6",
    reference: "R-2024-040",
    title: "Dépassement des niveaux sonores",
    category: "HSE",
    probability: 4,
    impact: 2,
    owner: "Luc Petit",
    status: "monitored",
    treatment: "Port obligatoire des protections auditives",
  },
]

function getRiskLevel(probability: number, impact: number): string {
  const score = probability * impact
  if (score >= 12) return "critical"
  if (score >= 6) return "high"
  if (score >= 3) return "medium"
  return "low"
}

function getRiskColor(level: string): string {
  switch (level) {
    case "critical": return "bg-red-500"
    case "high": return "bg-orange-500"
    case "medium": return "bg-yellow-500"
    case "low": return "bg-green-500"
    default: return "bg-gray-400"
  }
}

function getRiskLabel(level: string): string {
  switch (level) {
    case "critical": return "Critique"
    case "high": return "Élevé"
    case "medium": return "Modéré"
    case "low": return "Faible"
    default: return "—"
  }
}

// Risk matrix component
function RiskMatrix() {
  const labels = ["Très faible", "Faible", "Modéré", "Élevé", "Très élevé"]
  const colors = [
    // Row 5 (impact highest)
    ["bg-yellow-200", "bg-orange-300", "bg-red-400", "bg-red-500", "bg-red-600"],
    // Row 4
    ["bg-green-200", "bg-yellow-200", "bg-orange-300", "bg-red-400", "bg-red-500"],
    // Row 3
    ["bg-green-200", "bg-green-200", "bg-yellow-200", "bg-orange-300", "bg-red-400"],
    // Row 2
    ["bg-green-100", "bg-green-200", "bg-green-200", "bg-yellow-200", "bg-orange-300"],
    // Row 1 (impact lowest)
    ["bg-green-100", "bg-green-100", "bg-green-100", "bg-green-200", "bg-yellow-200"],
  ]

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2">
        {/* Y axis label */}
        <div className="flex items-center">
          <div className="text-xs text-gray-500 -rotate-90 whitespace-nowrap w-4 mr-2">
            Impact
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5 gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              Array.from({ length: 5 }).map((_, colIdx) => {
                const impactLevel = 5 - rowIdx
                const probLevel = colIdx + 1
                const riskScore = impactLevel * probLevel
                const risksHere = mockRisks.filter(
                  r => r.impact === impactLevel && r.probability === probLevel
                )

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`${colors[rowIdx][colIdx]} h-16 w-16 rounded flex items-center justify-center relative cursor-default hover:opacity-80 transition-opacity`}
                    title={`Impact: ${impactLevel}, Probabilité: ${probLevel}, Score: ${riskScore}`}
                  >
                    <span className="text-xs font-bold text-white/80">{riskScore}</span>
                    {risksHere.length > 0 && (
                      <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white/90 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-800">{risksHere.length}</span>
                      </div>
                    )}
                  </div>
                )
              })
            ))}
          </div>
          {/* X axis labels */}
          <div className="grid grid-cols-5 gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-4 w-16 flex items-center justify-center">
                <span className="text-xs text-gray-500">{n}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-gray-500 mt-1">Probabilité</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-3 flex-wrap">
        {[
          { label: "Faible (1-2)", color: "bg-green-200" },
          { label: "Modéré (3-5)", color: "bg-yellow-200" },
          { label: "Élevé (6-11)", color: "bg-orange-300" },
          { label: "Critique (12-25)", color: "bg-red-500" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div className={`h-3 w-3 rounded ${item.color}`} />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RisksPage() {
  const [search, setSearch] = useState("")

  const filtered = mockRisks.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.reference.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registre des Risques</h2>
          <p className="text-sm text-gray-500 mt-1">Identification et maîtrise des risques</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau risque
        </Button>
      </div>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Matrice des risques</CardTitle>
          <CardDescription>Visualisation Probabilité × Impact — Les chiffres indiquent le nombre de risques par cellule</CardDescription>
        </CardHeader>
        <CardContent>
          <RiskMatrix />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Critiques", count: mockRisks.filter(r => getRiskLevel(r.probability, r.impact) === "critical").length, color: "text-red-600", bg: "bg-red-50" },
          { label: "Élevés", count: mockRisks.filter(r => getRiskLevel(r.probability, r.impact) === "high").length, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Modérés", count: mockRisks.filter(r => getRiskLevel(r.probability, r.impact) === "medium").length, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Faibles", count: mockRisks.filter(r => getRiskLevel(r.probability, r.impact) === "low").length, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat) => (
          <Card key={stat.label} className={stat.bg}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un risque..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Risks Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            {filtered.length} risque{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Référence</TableHead>
                <TableHead>Risque</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-center">Prob.</TableHead>
                <TableHead className="text-center">Impact</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Traitement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((risk) => {
                const level = getRiskLevel(risk.probability, risk.impact)
                const score = risk.probability * risk.impact
                return (
                  <TableRow key={risk.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-mono text-xs text-gray-500">
                      {risk.reference}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="font-medium text-gray-900 text-sm">{risk.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{risk.category}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">
                        {risk.probability}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">
                        {risk.impact}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold ${getRiskColor(level)}`}>
                        {score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        level === "critical" ? "bg-red-100 text-red-700" :
                        level === "high" ? "bg-orange-100 text-orange-700" :
                        level === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {getRiskLabel(level)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{risk.owner}</TableCell>
                    <TableCell className="text-sm text-gray-500 max-w-[200px] truncate">
                      {risk.treatment}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
