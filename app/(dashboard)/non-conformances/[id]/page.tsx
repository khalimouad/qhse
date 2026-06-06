"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  ArrowLeft, Plus, Send, Calendar, User,
  AlertTriangle, Clock, MapPin, CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockNC = {
  id: "1",
  reference: "NC-2026-023",
  title: "Défaut de soudage sur pièce P-456",
  status: "open" as const,
  severity: "major" as const,
  source: "Production",
  location: "Atelier soudage — Poste 3",
  detectedBy: "Jean Dupont",
  detectedAt: new Date("2026-06-01"),
  dueDate: new Date("2026-07-01"),
  description:
    "Lors du contrôle visuel de la pièce P-456, un défaut de soudage a été constaté. La soudure présente des porosités et un manque de fusion sur une longueur de 15 mm. Cette non-conformité impacte la résistance mécanique de l'assemblage.",
  immediateAction:
    "La pièce a été mise en quarantaine. La série de production a été suspendue dans l'attente de l'analyse des causes.",
  comments: [
    { id: 1, author: "Sophie Moreau", role: "Responsable QSE",   content: "Analyse des causes en cours. Les paramètres de soudage sont vérifiés.", createdAt: new Date("2026-06-02T09:30:00") },
    { id: 2, author: "Jean Dupont",   role: "Technicien",         content: "Le paramètre d'intensité était hors tolérance. Réglage effectué et test de validation en cours.", createdAt: new Date("2026-06-03T14:15:00") },
  ],
  timeline: [
    { date: new Date("2026-06-01"), event: "Non-conformité détectée et déclarée", type: "created" },
    { date: new Date("2026-06-01"), event: "Pièce mise en quarantaine",           type: "action"  },
    { date: new Date("2026-06-02"), event: "Analyse des causes initiée",          type: "update"  },
    { date: new Date("2026-06-03"), event: "CAPA-2026-018 créée",                 type: "capa"    },
  ],
}

const severityMap: Record<string, { label: string; variant: "destructive" | "warning" | "outline" }> = {
  critical:    { label: "Critique",    variant: "destructive" },
  major:       { label: "Majeure",     variant: "warning" },
  minor:       { label: "Mineure",     variant: "outline" },
  observation: { label: "Observation", variant: "outline" },
}

const timelineDot: Record<string, string> = {
  created: "bg-red-500",
  action:  "bg-blue-500",
  update:  "bg-amber-500",
  capa:    "bg-purple-500",
}

const infoRows = [
  { icon: AlertTriangle, label: "Source",           value: mockNC.source },
  { icon: User,          label: "Détecté par",      value: mockNC.detectedBy },
  { icon: MapPin,        label: "Lieu",             value: mockNC.location },
  { icon: Calendar,      label: "Date de détection",value: format(mockNC.detectedAt, "dd MMM yyyy", { locale: fr }) },
  { icon: Clock,         label: "Échéance",         value: format(mockNC.dueDate, "dd MMM yyyy", { locale: fr }), red: true },
]

export default function NCDetailPage() {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const sev = severityMap[mockNC.severity]

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* ── Compact sticky page title strip ── */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9 shrink-0" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs text-gray-400">{mockNC.reference}</span>
            <Badge variant="destructive" className="text-xs">Ouverte</Badge>
            <Badge variant={sev.variant} className="text-xs">{sev.label}</Badge>
          </div>
          <h2 className="mt-0.5 text-lg font-bold leading-tight text-gray-900">{mockNC.title}</h2>
        </div>
      </div>

      {/* ── Action buttons row ── */}
      <div className="flex flex-wrap gap-2">
        <Link href="/capa/new">
          <Button variant="outline" size="sm" className="h-9">
            <Plus className="mr-1.5 h-4 w-4" />
            Créer CAPA
          </Button>
        </Link>
        <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Clôturer NC
        </Button>
      </div>

      {/* ── Info strip (scrollable on mobile) ── */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {infoRows.map(({ icon: Icon, label, value, red }) => (
          <div key={label} className="flex shrink-0 flex-col rounded-xl border bg-white p-3 shadow-sm min-w-[120px]">
            <div className="flex items-center gap-1 text-gray-400">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
            </div>
            <span className={`mt-1 text-sm font-semibold ${red ? "text-red-600" : "text-gray-900"}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Description ── */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <p className="text-sm leading-relaxed text-gray-700">{mockNC.description}</p>
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="mb-1 text-xs font-semibold text-blue-700">Action immédiate</p>
            <p className="text-sm text-blue-800">{mockNC.immediateAction}</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Timeline ── */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock className="h-4 w-4 text-blue-500" />
            Chronologie
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="relative pl-5">
            {/* Vertical line */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200" />
            <div className="space-y-5">
              {mockNC.timeline.map((item, idx) => (
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

      {/* ── CAPA liée ── */}
      <Link href="/capa/1">
        <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4 hover:bg-purple-100 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200">
            <span className="text-xs font-bold text-purple-700">CA</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-purple-900">CAPA-2026-018</p>
            <p className="truncate text-xs text-purple-600">Révision des paramètres de soudage TIG</p>
          </div>
          <ArrowLeft className="h-4 w-4 rotate-180 text-purple-400" />
        </div>
      </Link>

      {/* ── Comments ── */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-semibold text-gray-700">Commentaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          {mockNC.comments.map((c) => (
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
                  <span className="ml-auto text-xs text-gray-400">
                    {format(c.createdAt, "dd MMM HH:mm", { locale: fr })}
                  </span>
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
              <Button
                size="sm"
                className="h-8 bg-blue-600 hover:bg-blue-700"
                disabled={!comment.trim()}
              >
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
