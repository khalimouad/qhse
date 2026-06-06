"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Plus,
  ShieldAlert,
  Eye,
  RefreshCw,
  Download,
  AlertOctagon,
  Flame,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"

interface Risk {
  id: string
  reference: string
  title: string
  category: string
  probability: number
  impact: number
  owner: string
  status: "active" | "treated" | "monitored"
  treatment: string
}

const mockRisks: Risk[] = [
  { id: "1", reference: "R-2024-045", title: "Rupture d'approvisionnement matières premières", category: "Supply Chain", probability: 3, impact: 4, owner: "Pierre Bernard", status: "active", treatment: "Diversification des fournisseurs" },
  { id: "2", reference: "R-2024-044", title: "Panne équipement critique de production", category: "Production", probability: 2, impact: 5, owner: "Jean Dupont", status: "active", treatment: "Plan de maintenance préventive" },
  { id: "3", reference: "R-2024-043", title: "Contamination produit chimique", category: "HSE", probability: 1, impact: 5, owner: "Luc Petit", status: "treated", treatment: "Procédure de manipulation et EPI renforcés" },
  { id: "4", reference: "R-2024-042", title: "Non-conformité documentaire lors audit", category: "Qualité", probability: 3, impact: 3, owner: "Sophie Moreau", status: "active", treatment: "Révision système documentaire" },
  { id: "5", reference: "R-2024-041", title: "Accident de travail chute de hauteur", category: "HSE", probability: 2, impact: 5, owner: "Marie Martin", status: "treated", treatment: "Formation et équipements anti-chute" },
  { id: "6", reference: "R-2024-040", title: "Dépassement des niveaux sonores", category: "HSE", probability: 4, impact: 2, owner: "Luc Petit", status: "monitored", treatment: "Port obligatoire des protections auditives" },
  { id: "7", reference: "R-2024-039", title: "Cyberattaque sur système de production", category: "SI", probability: 3, impact: 5, owner: "Marc Leroy", status: "active", treatment: "Renforcement pare-feu et sauvegardes" },
  { id: "8", reference: "R-2024-038", title: "Erreur de dosage automate", category: "Production", probability: 2, impact: 4, owner: "Jean Dupont", status: "monitored", treatment: "Contrôle métrologique renforcé" },
  { id: "9", reference: "R-2024-037", title: "Départ de personnel clé", category: "RH", probability: 3, impact: 3, owner: "Sophie Moreau", status: "active", treatment: "Plan de succession et documentation" },
  { id: "10", reference: "R-2024-036", title: "Pollution accidentelle des sols", category: "HSE", probability: 1, impact: 4, owner: "Luc Petit", status: "treated", treatment: "Bacs de rétention et procédure d'urgence" },
  { id: "11", reference: "R-2024-035", title: "Retard de livraison client majeur", category: "Supply Chain", probability: 4, impact: 3, owner: "Pierre Bernard", status: "active", treatment: "Stock de sécurité et planification" },
  { id: "12", reference: "R-2024-034", title: "Défaillance système de ventilation", category: "Production", probability: 2, impact: 2, owner: "Claire Durand", status: "monitored", treatment: "Maintenance et contrôles périodiques" },
  { id: "13", reference: "R-2024-033", title: "Incendie zone de stockage solvants", category: "HSE", probability: 1, impact: 5, owner: "Marie Martin", status: "treated", treatment: "Système d'extinction et zonage ATEX" },
  { id: "14", reference: "R-2024-032", title: "Obsolescence d'un équipement de mesure", category: "Qualité", probability: 3, impact: 2, owner: "Marie Martin", status: "monitored", treatment: "Plan de renouvellement métrologie" },
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
  const router = useRouter()

  const critical = mockRisks.filter((r) => getRiskLevel(r.probability, r.impact) === "critical").length
  const high = mockRisks.filter((r) => getRiskLevel(r.probability, r.impact) === "high").length
  const medium = mockRisks.filter((r) => getRiskLevel(r.probability, r.impact) === "medium").length
  const low = mockRisks.filter((r) => getRiskLevel(r.probability, r.impact) === "low").length

  const columns: DataTableColumn<Risk>[] = [
    {
      key: "reference",
      header: "Référence",
      sortValue: (r) => r.reference,
      cell: (r) => <span className="font-mono text-xs text-gray-500">{r.reference}</span>,
    },
    {
      key: "title",
      header: "Risque",
      sortValue: (r) => r.title,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">{r.title}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Catégorie",
      sortValue: (r) => r.category,
      hideOnMobile: true,
      cell: (r) => <Badge variant="outline" className="text-xs">{r.category}</Badge>,
    },
    {
      key: "probability",
      header: "Prob.",
      sortValue: (r) => r.probability,
      align: "center",
      hideOnMobile: true,
      cell: (r) => (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">
          {r.probability}
        </span>
      ),
    },
    {
      key: "impact",
      header: "Impact",
      sortValue: (r) => r.impact,
      align: "center",
      hideOnMobile: true,
      cell: (r) => (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">
          {r.impact}
        </span>
      ),
    },
    {
      key: "score",
      header: "Score",
      sortValue: (r) => r.probability * r.impact,
      align: "center",
      cell: (r) => {
        const level = getRiskLevel(r.probability, r.impact)
        const score = r.probability * r.impact
        return (
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold ${getRiskColor(level)}`}>
            {score}
          </span>
        )
      },
    },
    {
      key: "level",
      header: "Niveau",
      sortValue: (r) => r.probability * r.impact,
      cell: (r) => {
        const level = getRiskLevel(r.probability, r.impact)
        return (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            level === "critical" ? "bg-red-100 text-red-700" :
            level === "high" ? "bg-orange-100 text-orange-700" :
            level === "medium" ? "bg-yellow-100 text-yellow-700" :
            "bg-green-100 text-green-700"
          }`}>
            {getRiskLabel(level)}
          </span>
        )
      },
    },
    {
      key: "owner",
      header: "Responsable",
      sortValue: (r) => r.owner,
      hideOnMobile: true,
      cell: (r) => <span className="text-sm text-gray-600">{r.owner}</span>,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registre des Risques"
        description="Identification et maîtrise des risques"
        icon={ShieldAlert}
      >
        <Link href="/risks">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau risque
          </Button>
        </Link>
      </PageHeader>

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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Critiques" value={critical} icon={AlertOctagon} iconColor="text-red-600" iconBg="bg-red-50" />
        <StatCard title="Élevés" value={high} icon={Flame} iconColor="text-orange-600" iconBg="bg-orange-50" />
        <StatCard title="Modérés" value={medium} icon={AlertTriangle} iconColor="text-yellow-600" iconBg="bg-yellow-50" />
        <StatCard title="Faibles" value={low} icon={ShieldCheck} iconColor="text-green-600" iconBg="bg-green-50" />
      </div>

      {/* Risks Table */}
      <Card>
        <CardContent className="p-4">
          <DataTable
            data={mockRisks}
            columns={columns}
            getRowId={(r) => r.id}
            searchPlaceholder="Rechercher par titre ou référence..."
            searchAccessor={(r) => `${r.title} ${r.reference} ${r.owner} ${r.category}`}
            filters={[
              {
                key: "category",
                label: "Catégorie",
                value: (r) => r.category,
                options: [
                  { value: "Supply Chain", label: "Supply Chain" },
                  { value: "Production", label: "Production" },
                  { value: "HSE", label: "HSE" },
                  { value: "Qualité", label: "Qualité" },
                  { value: "SI", label: "SI" },
                  { value: "RH", label: "RH" },
                ],
              },
              {
                key: "level",
                label: "Niveau",
                value: (r) => getRiskLevel(r.probability, r.impact),
                options: [
                  { value: "critical", label: "Critique" },
                  { value: "high", label: "Élevé" },
                  { value: "medium", label: "Modéré" },
                  { value: "low", label: "Faible" },
                ],
              },
            ]}
            onRowClick={(r) => router.push(`/risks/${r.id}`)}
            rowActions={(r) => (
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/risks/${r.id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            )}
            bulkActions={[
              { label: "Réévaluer", icon: RefreshCw, onClick: () => {}, variant: "outline" },
              { label: "Exporter", icon: Download, onClick: () => {}, variant: "outline" },
            ]}
            emptyMessage="Aucun risque."
          />
        </CardContent>
      </Card>
    </div>
  )
}
