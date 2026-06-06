"use client"

import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  FileText,
  Clock,
  Activity,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CalendarClock,
  Truck,
  MessageSquareWarning,
  ChevronRight,
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
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/ui/stat-card"

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

const complianceData = [
  { name: "Conformité", value: 92, fill: "#10b981" },
]

const auditByType = [
  { type: "Interne", count: 8 },
  { type: "Externe", count: 4 },
  { type: "Fournisseur", count: 5 },
]

const objectivesData = [
  { label: "Taux de conformité", value: 92, target: 95, color: "bg-green-500" },
  { label: "NC clôturées dans les délais", value: 78, target: 85, color: "bg-amber-500" },
  { label: "Actions CAPA réalisées", value: 84, target: 80, color: "bg-blue-500" },
  { label: "Audits planifiés réalisés", value: 67, target: 90, color: "bg-red-500" },
]

const certifications = [
  { name: "ISO 9001", label: "Qualité", status: "valid", expiry: new Date("2026-11-15") },
  { name: "ISO 14001", label: "Environnement", status: "valid", expiry: new Date("2026-09-20") },
  { name: "ISO 45001", label: "Santé & Sécurité", status: "soon", expiry: new Date("2026-07-30") },
]

const overdueItems = [
  { type: "NC",    ref: "NC-2026-020",    title: "Matière première hors spécifications",    due: "il y a 3 jours", href: "/non-conformances/1", color: "bg-red-100 text-red-600"    },
  { type: "CAPA",  ref: "CAPA-2026-011",  title: "Mise à jour étiquetage produits finis",   due: "il y a 1 jour",  href: "/capa/1",             color: "bg-amber-100 text-amber-600" },
  { type: "Audit", ref: "AUD-2026-012",   title: "Audit interne ISO 9001 — Production",     due: "demain",         href: "/audits/1",           color: "bg-blue-100 text-blue-600"   },
  { type: "Doc",   ref: "PRO-ENV-005",    title: "Révision procédure gestion des déchets",  due: "dans 5 jours",   href: "/documents",          color: "bg-purple-100 text-purple-600"},
]

const recentActivities = [
  { id: 1, type: "nc",       href: "/non-conformances/1", title: "NC-2026-023 créée",              description: "Non-conformité sur le processus de soudage",         time: "Il y a 2 heures", user: "Jean Dupont",   color: "bg-red-100 text-red-600"     },
  { id: 2, type: "capa",     href: "/capa/1",             title: "CAPA-2026-015 mise à jour",      description: "Action corrective vérifiée et fermée",              time: "Il y a 4 heures", user: "Marie Martin",  color: "bg-green-100 text-green-600" },
  { id: 3, type: "document", href: "/documents/1",        title: "DOC-PRO-012 approuvé",           description: "Procédure de contrôle qualité v2.1",                time: "Hier",            user: "Pierre Bernard",color: "bg-blue-100 text-blue-600"   },
  { id: 4, type: "audit",    href: "/audits/1",           title: "Audit planifié",                 description: "Audit interne ISO 9001 — Département Production",   time: "Hier",            user: "Sophie Moreau", color: "bg-purple-100 text-purple-600"},
  { id: 5, type: "complaint",href: "/complaints/1",       title: "Réclamation REC-2026-008 résolue",description: "Réclamation client traitée et clôturée",           time: "Il y a 2 jours",  user: "Luc Petit",     color: "bg-orange-100 text-orange-600"},
]

const activityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  nc: AlertTriangle,
  capa: CheckSquare,
  document: FileText,
  audit: ClipboardList,
  complaint: MessageSquareWarning,
}

export default function DashboardPage() {
  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr })

  return (
    <div className="space-y-6">
      {/* Greeting banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm">
        <p className="text-sm capitalize text-blue-100">{today}</p>
        <h2 className="mt-1 text-2xl font-bold">Bonjour, bienvenue sur QualiSafe</h2>
        <p className="mt-1 text-sm text-blue-100">
          Voici une vue d&apos;ensemble de votre système de management QHSE.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/non-conformances"><StatCard title="Non-Conformités ouvertes" value={14} icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-50" change="+3 ce mois" trend="up" /></Link>
        <Link href="/capa"><StatCard title="CAPA en attente" value={20} icon={CheckSquare} iconColor="text-amber-600" iconBg="bg-amber-50" change="-2 ce mois" trend="down" /></Link>
        <Link href="/audits"><StatCard title="Audits à venir" value={3} icon={ClipboardList} iconColor="text-blue-600" iconBg="bg-blue-50" hint="prochains 30 jours" /></Link>
        <Link href="/documents"><StatCard title="Documents à réviser" value={7} icon={FileText} iconColor="text-purple-600" iconBg="bg-purple-50" change="+1 ce mois" trend="up" /></Link>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tendance des Non-Conformités</CardTitle>
            <CardDescription>Évolution des NC ouvertes vs fermées (6 derniers mois)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={ncTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorOuvertes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFermees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="ouvertes" stroke="#ef4444" fill="url(#colorOuvertes)" name="Ouvertes" strokeWidth={2} />
                <Area type="monotone" dataKey="fermées" stroke="#10b981" fill="url(#colorFermees)" name="Fermées" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">CAPA par Statut</CardTitle>
            <CardDescription>Répartition des actions correctives</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={capaStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {capaStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} CAPA`, ""]} />
                <Legend formatter={(value) => <span className="text-xs text-gray-600">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: compliance gauge + audits + objectives */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Taux de conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={complianceData} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="-mt-24 text-center text-3xl font-bold text-gray-900">92%</p>
            <p className="mt-16 text-center text-xs text-gray-500">Objectif : 95%</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Audits par type</CardTitle>
            <CardDescription>Année en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={auditByType} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Audits" barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Objectifs qualité</CardTitle>
            <CardDescription>Réalisé vs cible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {objectivesData.map((obj) => (
              <div key={obj.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-700">{obj.label}</span>
                  <span className="font-medium text-gray-900">
                    {obj.value}% <span className="text-xs text-gray-400">/ {obj.target}%</span>
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${obj.color}`} style={{ width: `${obj.value}%` }} />
                  <div className="absolute top-0 h-2 w-px bg-gray-700" style={{ left: `${obj.target}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: overdue + certifications + activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Overdue / action required */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <CalendarClock className="h-4 w-4 text-red-600" />
              Actions requises
            </CardTitle>
            <Link href="/action-plan" className="text-xs font-medium text-blue-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueItems.map((item) => (
              <Link key={item.ref} href={item.href} className="flex items-center gap-3 rounded-lg border border-gray-100 p-2.5 transition-colors hover:bg-gray-50">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${item.color}`}>
                  {item.type}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="font-mono text-xs text-gray-400">{item.ref}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-red-500">{item.due}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Certifications
            </CardTitle>
            <CardDescription>Statut des certifications ISO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={cert.status === "valid" ? "success" : "warning"}>
                    {cert.status === "valid" ? "Valide" : "Échéance proche"}
                  </Badge>
                  <p className="mt-1 text-xs text-gray-400">
                    {format(cert.expiry, "dd MMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Activity className="h-4 w-4 text-blue-600" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activityIcon[activity.type] ?? Activity
                return (
                  <Link key={activity.id} href={activity.href} className="flex items-start gap-3 rounded-lg p-1.5 -mx-1.5 hover:bg-gray-50 transition-colors">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="truncate text-sm text-gray-500">{activity.description}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{activity.time}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{activity.user}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 mt-2.5" />
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Nouvelle NC", href: "/non-conformances/new", icon: AlertTriangle, color: "text-red-600" },
          { label: "Nouvelle CAPA", href: "/capa/new", icon: CheckSquare, color: "text-amber-600" },
          { label: "Planifier audit", href: "/audits/new", icon: ClipboardList, color: "text-blue-600" },
          { label: "Nouveau document", href: "/documents/new", icon: FileText, color: "text-purple-600" },
          { label: "Réclamation", href: "/complaints/new", icon: MessageSquareWarning, color: "text-orange-600" },
          { label: "Fournisseur", href: "/suppliers/new", icon: Truck, color: "text-teal-600" },
        ].map((link) => (
          <Link key={link.label} href={link.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <link.icon className={`h-6 w-6 ${link.color}`} />
                <span className="text-xs font-medium text-gray-700">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
