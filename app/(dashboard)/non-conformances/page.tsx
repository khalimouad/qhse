"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Plus, Search, AlertTriangle, Eye } from "lucide-react"
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

const mockNCs = [
  {
    id: "1",
    reference: "NC-2024-023",
    title: "Défaut de soudage sur pièce P-456",
    status: "open",
    severity: "major",
    source: "Production",
    detectedBy: "Jean Dupont",
    detectedAt: new Date("2024-06-01"),
    dueDate: new Date("2024-07-01"),
  },
  {
    id: "2",
    reference: "NC-2024-022",
    title: "Non-conformité documentaire procédure HSE",
    status: "in_progress",
    severity: "minor",
    source: "Audit interne",
    detectedBy: "Marie Martin",
    detectedAt: new Date("2024-05-20"),
    dueDate: new Date("2024-06-20"),
  },
  {
    id: "3",
    reference: "NC-2024-021",
    title: "Dépassement des délais de calibration",
    status: "closed",
    severity: "major",
    source: "Contrôle qualité",
    detectedBy: "Pierre Bernard",
    detectedAt: new Date("2024-05-10"),
    dueDate: new Date("2024-06-10"),
  },
  {
    id: "4",
    reference: "NC-2024-020",
    title: "Matière première hors spécifications",
    status: "open",
    severity: "critical",
    source: "Réception",
    detectedBy: "Sophie Moreau",
    detectedAt: new Date("2024-05-05"),
    dueDate: new Date("2024-05-20"),
  },
  {
    id: "5",
    reference: "NC-2024-019",
    title: "EPI non port par opérateur",
    status: "closed",
    severity: "minor",
    source: "HSE",
    detectedBy: "Luc Petit",
    detectedAt: new Date("2024-04-28"),
    dueDate: new Date("2024-05-28"),
  },
]

const statusLabels: Record<string, string> = {
  open: "Ouverte",
  in_progress: "En cours",
  closed: "Fermée",
}

const severityLabels: Record<string, string> = {
  critical: "Critique",
  major: "Majeure",
  minor: "Mineure",
  observation: "Observation",
}

const statusVariant: Record<string, "destructive" | "warning" | "success"> = {
  open: "destructive",
  in_progress: "warning",
  closed: "success",
}

const severityVariant: Record<string, "destructive" | "warning" | "outline" | "secondary"> = {
  critical: "destructive",
  major: "warning",
  minor: "outline",
  observation: "secondary",
}

export default function NonConformancesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const filtered = mockNCs.filter((nc) => {
    const matchSearch =
      nc.title.toLowerCase().includes(search.toLowerCase()) ||
      nc.reference.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || nc.status === statusFilter
    const matchSeverity = severityFilter === "all" || nc.severity === severityFilter
    return matchSearch && matchStatus && matchSeverity
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Non-Conformités</h2>
          <p className="text-sm text-gray-500 mt-1">Suivi des non-conformités détectées</p>
        </div>
        <Link href="/non-conformances/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle NC
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Totales", value: mockNCs.length, color: "text-gray-700" },
          { label: "Ouvertes", value: mockNCs.filter((n) => n.status === "open").length, color: "text-red-600" },
          { label: "En cours", value: mockNCs.filter((n) => n.status === "in_progress").length, color: "text-amber-600" },
          { label: "Fermées", value: mockNCs.filter((n) => n.status === "closed").length, color: "text-green-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
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
                placeholder="Rechercher une NC..."
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
                <SelectItem value="open">Ouverte</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="closed">Fermée</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes sévérités</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
                <SelectItem value="major">Majeure</SelectItem>
                <SelectItem value="minor">Mineure</SelectItem>
                <SelectItem value="observation">Observation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            {filtered.length} non-conformité{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Référence</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Détecté par</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((nc) => (
                <TableRow key={nc.id} className="hover:bg-red-50/30">
                  <TableCell className="font-mono text-xs text-gray-500">
                    {nc.reference}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="font-medium text-gray-900">{nc.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={severityVariant[nc.severity]}>
                      {severityLabels[nc.severity]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[nc.status]}>
                      {statusLabels[nc.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{nc.source}</TableCell>
                  <TableCell className="text-sm text-gray-600">{nc.detectedBy}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(nc.detectedAt, "dd MMM yyyy", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(nc.dueDate, "dd MMM yyyy", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/non-conformances/${nc.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
