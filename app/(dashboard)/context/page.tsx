"use client"

import { useState } from "react"
import { Compass, Target, Users, TrendingUp, ArrowUpCircle, Download } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { downloadCsv } from "@/lib/csv"

type PestelCategory = "Politique" | "Économique" | "Sociétal" | "Technologique" | "Environnemental" | "Légal"
type ImpactType = "Opportunité" | "Menace"
type ImpactLevel = "Élevé" | "Modéré" | "Faible"
type StakeholderType = "Interne" | "Externe"
type Influence = "Forte" | "Modérée" | "Faible"

interface PestelFactor {
  id: string
  categorie: PestelCategory
  facteur: string
  type: ImpactType
  niveau: ImpactLevel
  implication: string
}

interface Stakeholder {
  id: string
  nom: string
  type: StakeholderType
  influence: Influence
  interet: Influence
  attentes: string[]
  risque: string
}

const pestelFactors: PestelFactor[] = [
  { id: "P-01", categorie: "Politique", facteur: "Réglementation CSRD / Taxonomie verte UE", type: "Menace", niveau: "Élevé", implication: "Reporting ESG obligatoire dès 2026 — structurer la collecte de données." },
  { id: "P-02", categorie: "Politique", facteur: "Aides gouvernementales décarbonation industrie", type: "Opportunité", niveau: "Modéré", implication: "Accès à des subventions pour investissements équipements bas-carbone." },
  { id: "E-01", categorie: "Économique", facteur: "Inflation matières premières + énergie", type: "Menace", niveau: "Élevé", implication: "Pression sur les marges, révision des prix fournisseurs, optimisation énergétique." },
  { id: "E-02", categorie: "Économique", facteur: "Croissance marché aéronautique / défense", type: "Opportunité", niveau: "Élevé", implication: "Développement commercial et diversification clients grands comptes." },
  { id: "S-01", categorie: "Sociétal", facteur: "Attentes collaborateurs : QVT, télétravail, sens", type: "Menace", niveau: "Modéré", implication: "Risque de turn-over si politique RH insuffisante — plan QVT à renforcer." },
  { id: "S-02", categorie: "Sociétal", facteur: "Sensibilité clients à la performance RSE", type: "Opportunité", niveau: "Modéré", implication: "Différenciation concurrentielle via la maturité ESG et certifications." },
  { id: "T-01", categorie: "Technologique", facteur: "Automatisation / robotisation production", type: "Opportunité", niveau: "Élevé", implication: "Amélioration compétitivité, réduction TMS, reconversion compétences." },
  { id: "T-02", categorie: "Technologique", facteur: "Cybersécurité / SI industriel (OT)", type: "Menace", niveau: "Élevé", implication: "Risque cyberattaque sur systèmes de production — plan sécurité OT requis." },
  { id: "ENV-01", categorie: "Environnemental", facteur: "Réglementation ICPE — seuils émissions", type: "Menace", niveau: "Modéré", implication: "Mise en conformité COV / rejets aqueux avant inspection DREAL." },
  { id: "ENV-02", categorie: "Environnemental", facteur: "Raréfaction ressources eau / énergie", type: "Menace", niveau: "Modéré", implication: "Plan de sobriété hydrique et énergétique à intégrer dans les objectifs." },
  { id: "L-01", categorie: "Légal", facteur: "Renforcement exigences santé-sécurité (décrets)", type: "Menace", niveau: "Élevé", implication: "Veille réglementaire renforcée, mise à jour DUERP, formation habilitations." },
  { id: "L-02", categorie: "Légal", facteur: "Loi Sapin II / ISO 37001 anti-corruption", type: "Menace", niveau: "Faible", implication: "Programme conformité anti-corruption à formaliser pour marchés publics." },
]

const stakeholders: Stakeholder[] = [
  { id: "PI-01", nom: "Direction générale", type: "Interne", influence: "Forte", interet: "Forte", attentes: ["Performance financière", "Conformité réglementaire", "Réputation"], risque: "Faible — alignement stratégique" },
  { id: "PI-02", nom: "Collaborateurs / IRP", type: "Interne", influence: "Modérée", interet: "Forte", attentes: ["Sécurité au travail", "QVT", "Développement des compétences"], risque: "Conflit social si QVT dégradée" },
  { id: "PE-01", nom: "Clients grands comptes", type: "Externe", influence: "Forte", interet: "Forte", attentes: ["Qualité produit", "Délais", "Performance ESG fournisseur"], risque: "Perte de marché si notation RSE insuffisante" },
  { id: "PE-02", nom: "Autorités / DREAL / CARSAT", type: "Externe", influence: "Forte", interet: "Modérée", attentes: ["Conformité réglementaire", "Transparence reporting"], risque: "Mise en demeure / astreinte en cas de non-conformité" },
  { id: "PE-03", nom: "Fournisseurs stratégiques", type: "Externe", influence: "Modérée", interet: "Modérée", attentes: ["Partenariat long terme", "Conditions commerciales stables"], risque: "Rupture approvisionnement" },
  { id: "PE-04", nom: "Riverains / associations env.", type: "Externe", influence: "Faible", interet: "Forte", attentes: ["Absence de nuisances", "Transparence environnementale"], risque: "Opposition aux projets d'extension" },
  { id: "PE-05", nom: "Actionnaires / investisseurs", type: "Externe", influence: "Forte", interet: "Forte", attentes: ["Retour sur investissement", "Performance ESG"], risque: "Désengagement si performance ESG mauvaise" },
  { id: "PE-06", nom: "Organismes de certification (LRQA…)", type: "Externe", influence: "Modérée", interet: "Faible", attentes: ["Conformité ISO 9001/14001/45001"], risque: "Suspension de certification" },
]

const PESTEL_COLORS: Record<PestelCategory, string> = {
  Politique: "bg-purple-100 text-purple-700 border-purple-200",
  Économique: "bg-blue-100 text-blue-700 border-blue-200",
  Sociétal: "bg-pink-100 text-pink-700 border-pink-200",
  Technologique: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Environnemental: "bg-green-100 text-green-700 border-green-200",
  Légal: "bg-gray-100 text-gray-700 border-gray-200",
}

const IMPACT_COLORS: Record<ImpactType, string> = {
  Opportunité: "bg-green-100 text-green-700",
  Menace: "bg-red-100 text-red-700",
}

const NIVEAU_COLORS: Record<ImpactLevel, string> = {
  Élevé: "text-red-600 font-bold",
  Modéré: "text-amber-600 font-semibold",
  Faible: "text-green-600",
}

const INFLUENCE_DOT: Record<Influence, string> = {
  Forte: "bg-red-500",
  Modérée: "bg-amber-500",
  Faible: "bg-green-500",
}

const TABS = ["PESTEL", "Parties prenantes", "SWOT"] as const
type Tab = (typeof TABS)[number]

const swot = {
  forces: [
    "Certifications ISO 9001 / 14001 / 45001 actives",
    "Expertise technique reconnue (soudage, usinage)",
    "Portefeuille clients diversifié — grands comptes aéronautique",
    "Culture sécurité en progression constante",
    "Équipe RH engagée — faible absentéisme",
  ],
  faiblesses: [
    "Maturité ESG insuffisante (score 1.89/5)",
    "Dépendance forte sur quelques expertises clés (risque départ)",
    "SI production partiellement obsolète",
    "Taux de rebut production > objectif",
    "Veille réglementaire formalisée insuffisante",
  ],
  opportunites: [
    "Marchés aéronautique / défense en forte croissance",
    "Subventions décarbonation industrie (FTJ, ADEME)",
    "Différenciation RSE / ESG auprès clients",
    "Digitalisation production (ROI robotisation)",
    "Recrutement talents sensibles au projet d'entreprise",
  ],
  menaces: [
    "Concurrence internationale à faible coût",
    "Inflation énergie / matières premières persistante",
    "Renforcement réglementaire ICPE / CSRD",
    "Risque cybersécurité en hausse (OT/IT)",
    "Pénurie main-d'œuvre qualifiée (soudeurs, techniciens)",
  ],
}

export default function ContextPage() {
  const [activeTab, setActiveTab] = useState<Tab>("PESTEL")

  const opportunites = pestelFactors.filter((f) => f.type === "Opportunité").length
  const menaces = pestelFactors.filter((f) => f.type === "Menace").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contexte et enjeux"
        description="Analyse PESTEL, parties intéressées et SWOT — ISO 9001:2015 §4.1 / §4.2"
        icon={Compass}
      >
        <Button
          size="sm" variant="outline"
          onClick={() => downloadCsv("contexte-pestel.csv",
            ["Réf", "Catégorie", "Facteur", "Type", "Niveau", "Implication"],
            pestelFactors.map((f) => [f.id, f.categorie, f.facteur, f.type, f.niveau, f.implication])
          )}
        >
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Enjeux identifiés" value={pestelFactors.length} icon={Target} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Parties prenantes" value={stakeholders.length} icon={Users} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <StatCard title="Opportunités" value={opportunites} icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-50" />
        <StatCard title="Menaces" value={menaces} icon={ArrowUpCircle} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "PESTEL" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pestelFactors.map((f) => (
            <Card key={f.id} className="overflow-hidden">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${PESTEL_COLORS[f.categorie]}`}>
                    {f.categorie}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${IMPACT_COLORS[f.type]}`}>
                    {f.type}
                  </span>
                  <span className={`ml-auto text-xs ${NIVEAU_COLORS[f.niveau]}`}>{f.niveau}</span>
                </div>
                <p className="font-semibold text-sm text-gray-900">{f.facteur}</p>
                <p className="text-xs text-gray-600">{f.implication}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Parties prenantes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stakeholders.map((s) => (
              <Card key={s.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-gray-900">{s.nom}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.type === "Interne" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {s.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className={`h-2 w-2 rounded-full ${INFLUENCE_DOT[s.influence]}`} />
                      Influence : <strong>{s.influence}</strong>
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className={`h-2 w-2 rounded-full ${INFLUENCE_DOT[s.interet]}`} />
                      Intérêt : <strong>{s.interet}</strong>
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Attentes :</p>
                    <ul className="space-y-0.5">
                      {s.attentes.map((a) => (
                        <li key={a} className="text-xs text-gray-600">· {a}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">{s.risque}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "SWOT" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Forces", items: swot.forces, bg: "bg-green-50", border: "border-green-200", color: "text-green-800", dot: "bg-green-500" },
            { label: "Faiblesses", items: swot.faiblesses, bg: "bg-red-50", border: "border-red-200", color: "text-red-800", dot: "bg-red-500" },
            { label: "Opportunités", items: swot.opportunites, bg: "bg-blue-50", border: "border-blue-200", color: "text-blue-800", dot: "bg-blue-500" },
            { label: "Menaces", items: swot.menaces, bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-800", dot: "bg-amber-500" },
          ].map((quadrant) => (
            <Card key={quadrant.label} className={`border ${quadrant.border}`}>
              <CardHeader className={`${quadrant.bg} pb-2 pt-4 rounded-t-lg`}>
                <CardTitle className={`text-sm font-bold ${quadrant.color}`}>{quadrant.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 pb-4">
                <ul className="space-y-2">
                  {quadrant.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${quadrant.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
