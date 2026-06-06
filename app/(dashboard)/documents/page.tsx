"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Plus, Search, FileText, Download, Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockDocuments = [
  {
    id: "1",
    reference: "PRO-QUA-001",
    title: "Procédure de contrôle qualité entrant",
    category: "Procédure",
    status: "approved",
    version: "v3.2",
    owner: "Jean Dupont",
    reviewDate: new Date("2025-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    reference: "INS-PRO-012",
    title: "Instruction de soudage TIG",
    category: "Instruction",
    status: "approved",
    version: "v1.5",
    owner: "Marie Martin",
    reviewDate: new Date("2024-08-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    reference: "FRM-SEC-003",
    title: "Formulaire d'analyse de risque",
    category: "Formulaire",
    status: "draft",
    version: "v0.2",
    owner: "Pierre Bernard",
    reviewDate: new Date("2024-12-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "4",
    reference: "POL-QUA-001",
    title: "Politique qualité de l'entreprise",
    category: "Politique",
    status: "approved",
    version: "v2.0",
    owner: "Sophie Moreau",
    reviewDate: new Date("2025-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    reference: "PRO-ENV-005",
    title: "Procédure de gestion des déchets",
    category: "Procédure",
    status: "obsolete",
    version: "v1.0",
    owner: "Luc Petit",
    reviewDate: new Date("2023-06-30"),
    updatedAt: new Date("2022-06-30"),
  },
  {
    id: "6",
    reference: "PRO-SEC-008",
    title: "Procédure de travail en hauteur",
    category: "Procédure",
    status: "approved",
    version: "v2.1",
    owner: "Claire Durand",
    reviewDate: new Date("2025-02-28"),
    updatedAt: new Date("2024-02-28"),
  },
]

const statusLabels: Record<string, string> = {
  approved: "Approuvé",
  draft: "Brouillon",
  obsolete: "Obsolète",
}

const statusVariants: Record<string, "success" | "warning" | "secondary"> = {
  approved: "success",
  draft: "warning",
  obsolete: "secondary",
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filtered = mockDocuments.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.reference.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || doc.status === statusFilter
    const matchCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchSearch && matchStatus && matchCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="text-sm text-gray-500 mt-1">Gérez vos documents qualité</p>
        </div>
        <Link href="/documents/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {mockDocuments.filter((d) => d.status === "approved").length}
            </p>
            <p className="text-sm text-gray-600">Approuvés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {mockDocuments.filter((d) => d.status === "draft").length}
            </p>
            <p className="text-sm text-gray-600">Brouillons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-400">
              {mockDocuments.filter((d) => d.status === "obsolete").length}
            </p>
            <p className="text-sm text-gray-600">Obsolètes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par titre ou référence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="obsolete">Obsolète</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="Procédure">Procédure</SelectItem>
                <SelectItem value="Instruction">Instruction</SelectItem>
                <SelectItem value="Formulaire">Formulaire</SelectItem>
                <SelectItem value="Politique">Politique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            {filtered.length} document{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Référence</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Révision prévue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-blue-50/30">
                  <TableCell className="font-mono text-xs text-gray-500">
                    {doc.reference}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="font-medium text-gray-900">{doc.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
                      {doc.version}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[doc.status]}>
                      {statusLabels[doc.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{doc.owner}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(doc.reviewDate, "dd MMM yyyy", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/documents/${doc.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
