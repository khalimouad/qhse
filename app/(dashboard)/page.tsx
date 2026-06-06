"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const ncTrendData = [
  { month: "Jan", ouvertes: 4, fermées: 2 },
  { month: "Fév", ouvertes: 6, fermées: 4 },
  { month: "Mar", ouvertes: 3, fermées: 5 },
  { month: "Avr", ouvertes: 8, fermées: 3 },
  { month: "Mai", ouvertes: 5, fermées: 7 },
  { month: "Jun", ouvertes: 7, fermées: 5 },
]

const capaStatusData = [
  { name: "Ouvertes", value: 8, color: "#3b82f6" },
  { name: "En cours", value: 12, color: "#f59e0b" },
  { name: "Vérifiées", value: 5, color: "#8b5cf6" },
  { name: "Fermées", value: 23, color: "#10b981" },
]

const recentActivities = [
  {
    id: 1,
    type: "nc",
    title: "NC-2024-023 créée",
    description: "Non-conformité sur le processus de soudage",
    time: "Il y a 2 heures",
    user: "Jean Dupont",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    type: "capa",
    title: "CAPA-2024-015 mise à jour",
    description: "Action corrective vérifiée et fermée",
    time: "Il y a 4 heures",
    user: "Marie Martin",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    type: "document",
    title: "DOC-PRO-012 approuvé",
    description: "Procédure de contrôle qualité v2.1",
    time: "Hier",
    user: "Pierre Bernard",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    type: "audit",
    title: "Audit planifié",
    description: "Audit interne ISO 9001 - Département Production",
    time: "Hier",
    user: "Sophie Moreau",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    type: "risk",
    title: "Risque évalué",
    description: "Risque R-045 réévalué - criticité réduite",
    time: "Il y a 2 jours",
    user: "Luc Petit",
    color: "bg-yellow-100 text-yellow-600",
  },
]

const kpiCards = [
  {
    title: "Non-Conformités ouvertes",
    value: "14",
    change: "+3",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    title: "CAPA en attente",
    value: "20",
    change: "-2",
    trend: "down",
    icon: CheckSquare,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    title: "Audits à venir",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: ClipboardList,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Documents à réviser",
    value: "7",
    change: "+1",
    trend: "up",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
]

export default function DashboardPage() {
  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr })

  return (
    <div className="space-y-6">
      {/* Date and greeting */}
      <div>
        <p className="text-sm text-gray-500 capitalize">{today}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          Bonjour, bienvenue sur QualiSafe
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className={`border ${kpi.borderColor} hover:shadow-md transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                    ) : kpi.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <Activity className="h-4 w-4 text-gray-400 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${
                      kpi.trend === "up" ? "text-red-600" :
                      kpi.trend === "down" ? "text-green-600" :
                      "text-gray-500"
                    }`}>
                      {kpi.change !== "0" ? `${kpi.change} ce mois` : "Stable"}
                    </span>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* NC Trends Bar Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tendance des Non-Conformités</CardTitle>
            <CardDescription>Évolution des NC par mois (6 derniers mois)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ncTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="ouvertes" fill="#ef4444" name="Ouvertes" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fermées" fill="#10b981" name="Fermées" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CAPA Status Pie Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">CAPA par Statut</CardTitle>
            <CardDescription>Répartition des actions correctives</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={capaStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {capaStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} CAPA`, ""]} />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-gray-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                  {activity.type === "nc" && <AlertTriangle className="h-4 w-4" />}
                  {activity.type === "capa" && <CheckSquare className="h-4 w-4" />}
                  {activity.type === "document" && <FileText className="h-4 w-4" />}
                  {activity.type === "audit" && <ClipboardList className="h-4 w-4" />}
                  {activity.type === "risk" && <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
