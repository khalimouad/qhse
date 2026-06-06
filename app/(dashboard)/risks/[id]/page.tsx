"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  ArrowLeft, Send, User, Clock,
  ShieldAlert, AlertTriangle, CheckCircle2,
  TrendingDown, Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockRisk = {
  id: "1",
  reference: "R-2026-045",
  title: "Rupture d'approvisionnement matières premières",
  category: "Supply Chain",
  probability: 3,
  impact: 4,
  owner: "Pierre Bernard",
  status: "active" as const,
  description:
    "Risque de rupture de stock de matières premières stratégiques (acier inoxydable 316L) suite aux tensions géopolitiques et à la concentration de l'offre chez 2 fournisseurs principaux représentant 85% des approvisionnements.",
  treatment:
    "Diversification du panel fournisseurs : identification de 3 fournisseurs alternatifs qualifiés d'ici fin T3. Mise en place d'un stock de sécurité représentant 6 semaines de consommation. Revue mensuelle des indicateurs d'approvisionnement.",
  actions: [
    { id: 1, label: "Identifier 3 fournisseurs alternatifs qualifiés",              done: true,  dueDate: new Date("2026-06-30") },
    { id: 2, label: "Constituer un stock de sécurité 6 semaines",                   done: false, dueDate: new Date("2026-07-31") },
    { id: 3, label: "Mettre en place indicateur de suivi mensuel",                  done: true,  dueDate: new Date("2026-06-15") },
    { id: 4, label: "Réévaluer le risque après mise en place des actions",          done: false, dueDate: new Date("2026-09-01") },
  ],
  comments: [
    { id: 1, author: "Pierre Bernard", role: "Responsable Achats", content: "Deux fournisseurs alternatifs identifiés : FournisseurAlpha et BetaMatériaux. Qualification en cours.", createdAt: new Date("2026-05-20T11:00:00") },
    { id: 2, author: "Sophie Moreau",  role: "Responsable QSE",   content: "Indicateur de suivi créé dans le tableau de bord. Première revue prévue le 10 juin.", createdAt: new Date("2026-06-01T09:30:00") },
  ],
  timeline: [
    { date: new Date("2026-04-15"), event: "Risque identifié et enregistré",             type: "created" },
    { date: new Date("2026-04-20"), event: "Plan de traitement défini",                  type: "update"  },
    { date: new Date("2026-05-20"), event: "Recherche fournisseurs alternatifs lancée",  type: "action"  },
    { date: new Date("2026-06-01"), event: "Indicateur de suivi mis en place",           type: "action"  },
  ],
}

function getRiskScore(p: number, i: number) { return p * i }
function getRiskLevel(score: number) {
  if (score >= 12) return { label: "Critique",  color: "bg-red-600 text-white" }
  if (score >= 6)  return { label: "Élevé",     color: "bg-orange-500 text-white" }
  if (score >= 3)  return { label: "Modéré",    color: "bg-amber-400 text-white" }
  return               { label: "Faible",     color: "bg-green-500 text-white" }
}

const statusMap: Record<string, { label: string; variant: "destructive" | "warning" | "outline" | "default" }> = {
  active:    { label: "Actif",     variant: "destructive" },
  treated:   { label: "Traité",   variant: "outline" },
  monitored: { label: "Surveillé",variant: "default" },
}

const timelineDot: Record<string, string> = {
  created: "bg-red-500",
  action:  "bg-blue-500",
  update:  "bg-amber-500",
}

export default function RiskDetailPage() {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const score = getRiskScore(mockRisk.probability, mockRisk.impact)
  const level = getRiskLevel(score)
  const st = statusMap[mockRisk.status]

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9 shrink-0" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs text-gray-400">{mockRisk.reference}</span>
            <Badge variant={st.variant} className="text-xs">{st.label}</Badge>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${level.color}`}>{level.label}</span>
          </div>
          <h2 className="mt-0.5 text-lg font-bold leading-tight text-gray-900">{mockRisk.title}</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Marquer traité
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <Activity className="mr-1.5 h-4 w-4" />
          Réévaluer
        </Button>
      </div>

      {/* Info chips */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {[
          { label: "Catégorie",    value: mockRisk.category },
          { label: "Probabilité",  value: `${mockRisk.probability}/5` },
          { label: "Impact",       value: `${mockRisk.impact}/5` },
          { label: "Score",        value: `${score}/25`, red: score >= 12 },
          { label: "Propriétaire", value: mockRisk.owner },
        ].map(({ label, value, red }) => (
          <div key={label} className="flex shrink-0 flex-col rounded-xl border bg-white p-3 shadow-sm min-w-[100px]">
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">{label}</span>
            <span className={`mt-1 text-sm font-semibold ${red ? "text-red-600" : "text-gray-900"}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Risk matrix mini-display */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Criticité</p>
              <div className="flex items-center gap-2">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black ${level.color}`}>
                  {score}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{level.label}</p>
                  <p className="text-xs text-gray-400">P{mockRisk.probability} × I{mockRisk.impact}</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Actions</p>
              <p className="text-sm font-bold text-gray-900">{mockRisk.actions.filter(a => a.done).length}/{mockRisk.actions.length} réalisées</p>
              <p className="text-xs text-gray-400">plan de traitement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            Description du risque
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm leading-relaxed text-gray-700">{mockRisk.description}</p>
        </CardContent>
      </Card>

      {/* Treatment */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <TrendingDown className="h-4 w-4 text-green-500" />
            Plan de traitement
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 space-y-3">
          <p className="text-sm leading-relaxed text-gray-700">{mockRisk.treatment}</p>
          <div className="space-y-2 pt-1">
            {mockRisk.actions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${action.done ? "bg-green-500" : "bg-gray-200"}`}>
                  {action.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${action.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{action.label}</p>
                  <p className="text-xs text-gray-400">{format(action.dueDate, "dd MMM yyyy", { locale: fr })}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock className="h-4 w-4 text-blue-500" />
            Chronologie
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="relative pl-5">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200" />
            <div className="space-y-5">
              {mockRisk.timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`absolute left-0 flex h-4 w-4 items-center justify-center rounded-full ${timelineDot[item.type]}`}>
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-xs text-gray-400">{format(item.date, "dd MMM yyyy", { locale: fr })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-semibold text-gray-700">Commentaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          {mockRisk.comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                  {c.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-xl bg-gray-50 p-3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">{c.author}</span>
                  <span className="text-xs text-gray-400">{c.role}</span>
                  <span className="ml-auto text-xs text-gray-400">{format(c.createdAt, "dd MMM HH:mm", { locale: fr })}</span>
                </div>
                <p className="text-sm text-gray-700">{c.content}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Ajouter un commentaire..."
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none rounded-xl"
              />
              <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" disabled={!comment.trim()}>
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Publier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
