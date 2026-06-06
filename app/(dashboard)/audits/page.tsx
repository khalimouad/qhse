"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Plus, Search, ClipboardList, Eye, Calendar } from "lucide-react"
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

const mockAudits = [
  {
    id: "1",
    reference: "AUD-2024-012",
    title: "Audit interne ISO 9001 - Production",
    type: "internal",
    status: "planned",
    scope: "Département Production",
    auditor: "Sophie Moreau",
    date: new Date("2024-07-15"),
    duration: "2 jours",
    findings: 0,
  },
  {
    id: "2",
    reference: "AUD-2024-011",
    title: "Audit fournisseur - Métal SA",
    type: "supplier",
    status: "in_progress",
    scope: "Processus de fabrication",
    auditor: "Jean Dupont",
    date: new Date("2024-06-10"),
    duration: "1 jour",
    findings: 3,
  },
  {
    id: "3",
    reference: "AUD-2024-010",
    title: "Audit de certification ISO 14001",
    type: "external",
    status: "completed",
    scope: "Système de management environnemental",
    auditor: "Bureau Veritas",
    date: new Date("2024-05-20"),
    duration: "3 jours",
    findings: 2,
  },
  {
    id: "4",
    reference: "AUD-2024-009",
    title: "Audit interne HSE",
    type: "internal",
    status: "completed",
    scope: "Tous les départements",
    auditor: "Luc Petit",
    date: new Date("2024-04-15"),
    duration: "1 jour",
    findings: 5,
  },
  {
    id: "5",
    reference: "AUD-2024-013",
    title: "Audit de surveillance ISO 9001",
    type: "external",
    status: "planned",
    scope: "Direction et processus clés",
    auditor: "AFNOR",
    date: new Date("2024-09-01"),
    duration: "2 jours",
    findings: 0,
  },
]

const typeLabels: Record<string, string> = {
  internal: "Interne",
  external: "Externe",
  supplier: "Fournisseur",
}

const statusLabels: Record<string, string> = {
  planned: "Planifié",
  in_progress: "En cours",
  completed: "Terminé",
  cancelled: "Annulé",
}

const typeVariant: Record<string, "info" | "warning" | "secondary"> = {
  internal: "info",
  external: "warning",
  supplier: "secondary",
}

const statusVariant: Record<string, "outline" | "warning" | "success" | "secondary"> = {
  planned: "outline",
  in_progress: "warning",
  completed: "success",
  cancelled: "secondary",
}

export default function AuditsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = mockAudits.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.reference.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || a.status === statusFilter
    const matchType = typeFilter === "all" || a.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audits</h2>
          <p className="text-sm text-gray-500 mt-1">Programme et suivi des audits</p>
        </div>
        <Link href="/audits/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Planifier un audit
          </Button>
        </Link>
      </div>

      {/* Upcoming audits */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {mockAudits
          .filter((a) => a.status === "planned")
          .slice(0, 3)
          .map((a) => (
            <Card key={a.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant={typeVariant[a.type]} className="mb-2 text-xs">
                      {typeLabels[a.type]}
                    </Badge>
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{format(a.date, "dd MMM yyyy", { locale: fr })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un audit..."
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
                <SelectItem value="planned">Planifié</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="internal">Interne</SelectItem>
                <SelectItem value="external">Externe</SelectItem>
                <SelectItem value="supplier">Fournisseur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            {filtered.length} audit{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Référence</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Champ</TableHead>
                <TableHead>Auditeur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Écarts</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((audit) => (
                <TableRow key={audit.id} className="hover:bg-blue-50/30">
                  <TableCell className="font-mono text-xs text-gray-500">
                    {audit.reference}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="font-medium text-gray-900">{audit.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={typeVariant[audit.type]}>
                      {typeLabels[audit.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[audit.status]}>
                      {statusLabels[audit.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-[150px] truncate">
                    {audit.scope}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{audit.auditor}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(audit.date, "dd MMM yyyy", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {audit.findings > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        {audit.findings} écart{audit.findings > 1 ? "s" : ""}
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
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
