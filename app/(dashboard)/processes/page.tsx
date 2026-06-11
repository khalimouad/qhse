"use client"

import { GitMerge, Activity, CheckCircle2, RefreshCw, XCircle, Download, TrendingUp, TrendingDown } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { downloadCsv } from "@/lib/csv"

type ProcessType = "Management" | "Réalisation" | "Support"
type ProcessStatut = "À jour" | "En révision" | "Non conforme" | "À créer"

interface Process {
  id: string
  nom: string
  type: ProcessType
  pilote: string
  version: string
  dateRevision: string
  statut: ProcessStatut
  kpis: { label: string; valeur: string; cible: string; tendance: "up" | "down" | "stable" }[]
  description: string
}

const processes: Process[] = [
  {
    id: "P-MGT-01", nom: "Direction et leadership", type: "Management", pilote: "Thomas Laurent", version: "3.1", dateRevision: "2026-01-15", statut: "À jour",
    description: "Revue de direction, politique QHSE, objectifs stratégiques, communication interne.",
    kpis: [
      { label: "Taux objectifs atteints", valeur: "78%", cible: "85%", tendance: "up" },
      { label: "Revues de direction / an", valeur: "2", cible: "2", tendance: "stable" },
    ],
  },
  {
    id: "P-MGT-02", nom: "Amélioration continue", type: "Management", pilote: "Jean Dupont", version: "2.4", dateRevision: "2025-12-01", statut: "En révision",
    description: "Audits internes, non-conformités, CAPA, indicateurs de performance QHSE.",
    kpis: [
      { label: "NC fermées dans délai", valeur: "82%", cible: "90%", tendance: "up" },
      { label: "CAPA efficaces", valeur: "74%", cible: "80%", tendance: "stable" },
    ],
  },
  {
    id: "P-REA-01", nom: "Développement produit / R&D", type: "Réalisation", pilote: "Claire Dubois", version: "2.0", dateRevision: "2026-02-10", statut: "À jour",
    description: "Conception et développement des produits et services, revues de conception, validation.",
    kpis: [
      { label: "Taux projets dans délai", valeur: "68%", cible: "80%", tendance: "down" },
      { label: "Taux re-travail conception", valeur: "8%", cible: "5%", tendance: "down" },
    ],
  },
  {
    id: "P-REA-02", nom: "Production et réalisation", type: "Réalisation", pilote: "Antoine Leblanc", version: "4.2", dateRevision: "2026-01-20", statut: "À jour",
    description: "Pilotage de la production, maîtrise des procédés, contrôle qualité en cours de fabrication.",
    kpis: [
      { label: "Taux de rebut", valeur: "1.8%", cible: "1.5%", tendance: "down" },
      { label: "OEE ligne principale", valeur: "72%", cible: "78%", tendance: "up" },
    ],
  },
  {
    id: "P-REA-03", nom: "Achats et approvisionnements", type: "Réalisation", pilote: "Luc Petit", version: "2.1", dateRevision: "2026-03-05", statut: "À jour",
    description: "Qualification fournisseurs, commandes, réception et contrôle des matières et prestations.",
    kpis: [
      { label: "Taux fournisseurs qualifiés", valeur: "88%", cible: "90%", tendance: "stable" },
      { label: "Délai moyen livraison", valeur: "4.2 j", cible: "3.5 j", tendance: "down" },
    ],
  },
  {
    id: "P-REA-04", nom: "Ventes et relation client", type: "Réalisation", pilote: "Isabelle Roy", version: "1.8", dateRevision: "2026-04-12", statut: "À jour",
    description: "Traitement des commandes, offres commerciales, satisfaction client, réclamations.",
    kpis: [
      { label: "CSAT moyen", valeur: "7.8/10", cible: "8.0/10", tendance: "up" },
      { label: "Taux réclamations traitées", valeur: "94%", cible: "98%", tendance: "up" },
    ],
  },
  {
    id: "P-REA-05", nom: "Logistique et expéditions", type: "Réalisation", pilote: "Marc Durand", version: "2.3", dateRevision: "2025-11-01", statut: "En révision",
    description: "Gestion des stocks, préparation commandes, expéditions, transport et traçabilité.",
    kpis: [
      { label: "Taux de service client", valeur: "96%", cible: "98%", tendance: "stable" },
      { label: "Erreurs préparation", valeur: "0.6%", cible: "0.5%", tendance: "down" },
    ],
  },
  {
    id: "P-SUP-01", nom: "Ressources humaines", type: "Support", pilote: "Sophie Moreau", version: "2.7", dateRevision: "2026-02-28", statut: "À jour",
    description: "Recrutement, formation, compétences, entretiens annuels, paie, administration du personnel.",
    kpis: [
      { label: "Taux formation réalisée", valeur: "87%", cible: "90%", tendance: "up" },
      { label: "Taux turnover", valeur: "6.2%", cible: "5%", tendance: "down" },
    ],
  },
  {
    id: "P-SUP-02", nom: "Système d'information (SI)", type: "Support", pilote: "Thomas Bernard", version: "1.5", dateRevision: "2026-01-10", statut: "À jour",
    description: "Infrastructure IT, sécurité informatique, applications métier, support utilisateurs.",
    kpis: [
      { label: "Disponibilité SI", valeur: "99.2%", cible: "99.5%", tendance: "stable" },
      { label: "Incidents SI critiques", valeur: "1", cible: "0", tendance: "down" },
    ],
  },
  {
    id: "P-SUP-03", nom: "Maîtrise des équipements", type: "Support", pilote: "Marc Durand", version: "3.0", dateRevision: "2026-03-20", statut: "À jour",
    description: "Maintenance préventive/corrective, métrologie, plan de contrôle équipements critiques.",
    kpis: [
      { label: "MTBF équipements critiques", valeur: "1200 h", cible: "1500 h", tendance: "up" },
      { label: "Plan métrologie tenu", valeur: "92%", cible: "95%", tendance: "stable" },
    ],
  },
  {
    id: "P-SUP-04", nom: "Gestion documentaire", type: "Support", pilote: "Jean Dupont", version: "2.2", dateRevision: "2026-01-05", statut: "À jour",
    description: "Maîtrise des documents et enregistrements, diffusion, archivage et obsolescence.",
    kpis: [
      { label: "Documents à jour", valeur: "91%", cible: "95%", tendance: "up" },
      { label: "Délai moyen mise à jour", valeur: "4.8 j", cible: "3 j", tendance: "down" },
    ],
  },
  {
    id: "P-SUP-05", nom: "Environnement, santé & sécurité (HSE)", type: "Support", pilote: "Marie Martin", version: "1.9", dateRevision: "2025-10-01", statut: "Non conforme",
    description: "Pilotage du SME/SMSST, conformité réglementaire, veille, aspects environnementaux.",
    kpis: [
      { label: "Taux fréquence AT", valeur: "2.4", cible: "< 2.0", tendance: "down" },
      { label: "Indicateurs env. objectifs", valeur: "58%", cible: "80%", tendance: "down" },
    ],
  },
]

const TYPE_COLORS: Record<ProcessType, { bg: string; text: string; border: string; dot: string }> = {
  Management: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  Réalisation: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  Support: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", dot: "bg-teal-500" },
}

const STATUT_COLORS: Record<ProcessStatut, string> = {
  "À jour": "bg-green-100 text-green-700",
  "En révision": "bg-amber-100 text-amber-700",
  "Non conforme": "bg-red-100 text-red-700",
  "À créer": "bg-gray-100 text-gray-600",
}

export default function ProcessesPage() {
  const aJour = processes.filter((p) => p.statut === "À jour").length
  const enRevision = processes.filter((p) => p.statut === "En révision").length
  const nonConformes = processes.filter((p) => p.statut === "Non conforme").length

  const byType = {
    Management: processes.filter((p) => p.type === "Management"),
    Réalisation: processes.filter((p) => p.type === "Réalisation"),
    Support: processes.filter((p) => p.type === "Support"),
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des processus"
        description="Cartographie et pilotage des processus du système de management ISO"
        icon={GitMerge}
      >
        <Button
          size="sm" variant="outline"
          onClick={() => downloadCsv("processus.csv",
            ["Réf", "Nom", "Type", "Pilote", "Version", "Date révision", "Statut"],
            processes.map((p) => [p.id, p.nom, p.type, p.pilote, p.version, p.dateRevision, p.statut])
          )}
        >
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Processus actifs" value={processes.length} icon={Activity} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="À jour" value={aJour} icon={CheckCircle2} iconColor="text-green-600" iconBg="bg-green-50" />
        <StatCard title="En révision" value={enRevision} icon={RefreshCw} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Non conformes" value={nonConformes} icon={XCircle} iconColor="text-red-600" iconBg="bg-red-50" />
      </div>

      {/* Cartography by type */}
      {(["Management", "Réalisation", "Support"] as ProcessType[]).map((type) => {
        const c = TYPE_COLORS[type]
        return (
          <div key={type}>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
              Processus {type} ({byType[type].length})
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {byType[type].map((p) => (
                <Card key={p.id} className={`border overflow-hidden ${p.statut === "Non conforme" ? "border-red-300" : p.statut === "En révision" ? "border-amber-300" : "border-gray-200"}`}>
                  <div className={`h-1 ${c.dot}`} />
                  <CardHeader className="pb-2 pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-semibold">{p.nom}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          Pilote : {p.pilote} · v{p.version} · {p.dateRevision}
                        </CardDescription>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${STATUT_COLORS[p.statut]}`}>
                        {p.statut}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-1.5">
                      {p.kpis.map((kpi) => (
                        <div key={kpi.label} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 truncate pr-2">{kpi.label}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            {kpi.tendance === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : kpi.tendance === "down" ? (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            ) : null}
                            <span className="font-semibold text-gray-800">{kpi.valeur}</span>
                            <span className="text-gray-400">/ {kpi.cible}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
