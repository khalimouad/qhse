"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Plus, Search, CheckSquare, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

const mockCAPAs = [
  {
    id: "1",
    reference: "CAPA-2024-018",
    title: "Révision des paramètres de soudage TIG",
    type: "corrective",
    status: "in_progress",
    ncRef: "NC-2024-023",
    assignedTo: "Jean Dupont",
    dueDate: new Date("2024-07-15"),
    progress: 60,
    createdAt: new Date("2024-06-03"),
  },
  {
    id: "2",
    reference: "CAPA-2024-017",
    title: "Formation des opérateurs aux EPI",
    type: "corrective",
    status: "verified",
    ncRef: "NC-2024-019",
    assignedTo: "Marie Martin",
    dueDate: new Date("2024-06-30"),
    progress: 100,
    createdAt: new Date("2024-05-15"),
  },
  {
    id: "3",
    reference: "CAPA-2024-016",
    title: "Mise en place d'un plan de maintenance préventive",
    type: "preventive",
    status: "open",
    ncRef: null,
    assignedTo: "Pierre Bernard",
    dueDate: new Date("2024-08-01"),
    progress: 15,
    createdAt: new Date("2024-05-01"),
  },
  {
    id: "4",
    reference: "CAPA-2024-015",
    title: "Révision procédure de contrôle réception",
    type: "corrective",
    status: "closed",
    ncRef: "NC-2024-020",
    assignedTo: "Sophie Moreau",
    dueDate: new Date("2024-06-15"),
    progress: 100,
    createdAt: new Date("2024-04-20"),
  },
  {
    id: "5",
    reference: "CAPA-2024-014",
    title: "Amélioration du système de traçabilité",
    type: "preventive",
    status: "in_progress",
    ncRef: null,
    assignedTo: "Luc Petit",
    dueDate: new Date("2024-09-01"),
    progress: 35,
    createdAt: new Date("2024-04-01"),
  },
]

const statusLabels: Record<string, string> = {
  open: "Ouverte",
  in_progress: "En cours",
  verified: "Vérifiée",
  closed: "Fermée",
}

const typeLabels: Record<string, string> = {
  corrective: "Corrective",
  preventive: "Préventive",
}

const statusVariant: Record<string, "destructive" | "warning" | "info" | "success"> = {
  open: "destructive",
  in_progress: "warning",
  verified: "info",
  closed: "success",
}

export default function CapaPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = mockCAPAs.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.reference.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || c.status === statusFilter
    const matchType = typeFilter === "all" || c.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Actions CAPA</h2>
          <p className="text-sm text-gray-500 mt-1">Actions Correctives et Préventives</p>
        </div>
        <Link href="/capa/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle CAPA
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total", value: mockCAPAs.length, color: "text-gray-700" },
          { label: "Ouvertes", value: mockCAPAs.filter((c) => c.status === "open").length, color: "text-red-600" },
          { label: "En cours", value: mockCAPAs.filter((c) => c.status === "in_progress").length, color: "text-amber-600" },
          { label: "Vérifiées/Fermées", value: mockCAPAs.filter((c) => ["verified", "closed"].includes(c.status)).length, color: "text-green-600" },
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
                placeholder="Rechercher une CAPA..."
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
                <SelectItem value="verified">Vérifiée</SelectItem>
                <SelectItem value="closed">Fermée</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
                <SelectItem value="preventive">Préventive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            {filtered.length} action{filtered.length !== 1 ? "s" : ""}
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
                <TableHead>NC liée</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Avancement</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((capa) => (
                <TableRow key={capa.id} className="hover:bg-blue-50/30">
                  <TableCell className="font-mono text-xs text-gray-500">
                    {capa.reference}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="font-medium text-gray-900">{capa.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={capa.type === "corrective" ? "info" : "secondary"}>
                      {typeLabels[capa.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[capa.status]}>
                      {statusLabels[capa.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-500">
                    {capa.ncRef ? (
                      <Link href={`/non-conformances/1`} className="text-blue-600 hover:underline">
                        {capa.ncRef}
                      </Link>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{capa.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={capa.progress} className="h-2 w-16" />
                      <span className="text-xs text-gray-500">{capa.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(capa.dueDate, "dd MMM yyyy", { locale: fr })}
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
