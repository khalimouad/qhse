"use client"

import Link from "next/link"
import { ArrowLeft, Edit, Download, FileText, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const mockDoc = {
  id: "1",
  reference: "PRO-QUA-001",
  title: "Procédure de contrôle qualité entrant",
  category: "Procédure",
  status: "approved",
  version: "v3.2",
  owner: "Jean Dupont",
  approvedBy: "Sophie Moreau",
  reviewDate: new Date("2025-03-15"),
  approvedAt: new Date("2024-03-15"),
  createdAt: new Date("2022-01-10"),
  description:
    "Cette procédure définit les modalités de contrôle des matières premières et composants entrants. Elle s'applique à l'ensemble des réceptions de marchandises au sein de l'entreprise.",
  scope:
    "Département réception, Contrôle qualité, Magasin",
  revisions: [
    { version: "v3.2", date: new Date("2024-03-15"), author: "Jean Dupont", comment: "Mise à jour des critères d'acceptation" },
    { version: "v3.1", date: new Date("2023-08-20"), author: "Jean Dupont", comment: "Ajout du plan de surveillance" },
    { version: "v3.0", date: new Date("2022-11-05"), author: "Marie Martin", comment: "Révision majeure suite à l'audit" },
  ],
}

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/documents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-500">{mockDoc.reference}</span>
              <Badge variant="success">Approuvé</Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{mockDoc.title}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">{mockDoc.description}</p>
              <Separator className="my-4" />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Champ d&apos;application</p>
                <p className="text-sm text-gray-600">{mockDoc.scope}</p>
              </div>
            </CardContent>
          </Card>

          {/* Revision history */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique des révisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDoc.revisions.map((rev, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                        {rev.version}
                      </div>
                      {idx < mockDoc.revisions.length - 1 && (
                        <div className="flex-1 w-px bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{rev.comment}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {format(rev.date, "dd MMMM yyyy", { locale: fr })}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{rev.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Catégorie</p>
                  <p className="text-sm font-medium">{mockDoc.category}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Version actuelle</p>
                  <p className="text-sm font-medium font-mono">{mockDoc.version}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Responsable</p>
                  <p className="text-sm font-medium">{mockDoc.owner}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Approuvé par</p>
                  <p className="text-sm font-medium">{mockDoc.approvedBy}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Date d&apos;approbation</p>
                  <p className="text-sm font-medium">
                    {format(mockDoc.approvedAt, "dd MMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Prochaine révision</p>
                  <p className="text-sm font-medium text-orange-600">
                    {format(mockDoc.reviewDate, "dd MMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
