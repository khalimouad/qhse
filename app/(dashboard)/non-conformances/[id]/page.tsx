"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowLeft, Plus, Send, Calendar, User, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockNC = {
  id: "1",
  reference: "NC-2024-023",
  title: "Défaut de soudage sur pièce P-456",
  status: "open",
  severity: "major",
  source: "Production",
  location: "Atelier soudage - Poste 3",
  detectedBy: "Jean Dupont",
  detectedAt: new Date("2024-06-01"),
  dueDate: new Date("2024-07-01"),
  description:
    "Lors du contrôle visuel de la pièce P-456, un défaut de soudage a été constaté. La soudure présente des porosités et un manque de fusion sur une longueur de 15mm. Cette non-conformité impacte la résistance mécanique de l'assemblage.",
  immediateAction:
    "La pièce a été mise en quarantaine. La série de production a été suspendue dans l'attente de l'analyse des causes.",
  comments: [
    {
      id: 1,
      author: "Sophie Moreau",
      role: "Responsable QSE",
      content: "Analyse des causes en cours. Les paramètres de soudage sont vérifiés.",
      createdAt: new Date("2024-06-02T09:30:00"),
    },
    {
      id: 2,
      author: "Jean Dupont",
      role: "Technicien",
      content: "Le paramètre d'intensité était hors tolérance. Réglage effectué et test de validation en cours.",
      createdAt: new Date("2024-06-03T14:15:00"),
    },
  ],
  timeline: [
    { date: new Date("2024-06-01"), event: "Non-conformité détectée et déclarée", type: "created" },
    { date: new Date("2024-06-01"), event: "Pièce mise en quarantaine", type: "action" },
    { date: new Date("2024-06-02"), event: "Analyse des causes initiée", type: "update" },
    { date: new Date("2024-06-03"), event: "CAPA-2024-018 créée", type: "capa" },
  ],
}

export default function NCDetailPage({ params }: { params: { id: string } }) {
  const [comment, setComment] = useState("")

  const severityColors: Record<string, string> = {
    critical: "bg-red-100 text-red-700 border-red-200",
    major: "bg-orange-100 text-orange-700 border-orange-200",
    minor: "bg-yellow-100 text-yellow-700 border-yellow-200",
  }

  const timelineColors: Record<string, string> = {
    created: "bg-red-100 text-red-600",
    action: "bg-blue-100 text-blue-600",
    update: "bg-yellow-100 text-yellow-600",
    capa: "bg-purple-100 text-purple-600",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/non-conformances">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-gray-500">{mockNC.reference}</span>
              <Badge variant="destructive">Ouverte</Badge>
              <Badge variant="warning">Majeure</Badge>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{mockNC.title}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/capa/new">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Créer CAPA
            </Button>
          </Link>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Clôturer NC
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">{mockNC.description}</p>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Action immédiate</p>
                <p className="text-sm text-gray-600 bg-blue-50 rounded p-3">{mockNC.immediateAction}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Chronologie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNC.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${timelineColors[item.type]}`}>
                        {idx + 1}
                      </div>
                      {idx < mockNC.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1 min-h-[16px]" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {format(item.date, "dd MMM yyyy", { locale: fr })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Commentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockNC.comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      {c.author.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{c.author}</span>
                      <span className="text-xs text-gray-400">{c.role}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {format(c.createdAt, "dd MMM yyyy HH:mm", { locale: fr })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 bg-gray-50 rounded p-3">{c.content}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-blue-600 text-white text-xs">ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Ajouter un commentaire..."
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!comment.trim()}
                  >
                    <Send className="mr-2 h-3 w-3" />
                    Publier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="font-medium">{mockNC.source}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Détecté par</p>
                  <p className="font-medium">{mockNC.detectedBy}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Date de détection</p>
                  <p className="font-medium">
                    {format(mockNC.detectedAt, "dd MMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Échéance</p>
                  <p className="font-medium text-red-600">
                    {format(mockNC.dueDate, "dd MMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Lieu</p>
                <p className="text-sm font-medium">{mockNC.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">CAPA associées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-100">
                <div>
                  <p className="text-sm font-medium text-purple-900">CAPA-2024-018</p>
                  <p className="text-xs text-purple-600">En cours</p>
                </div>
                <Link href="/capa">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                    Voir
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
