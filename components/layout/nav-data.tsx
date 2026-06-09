import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  ShieldAlert,
  BarChart2,
  ListTodo,
  MessageSquareWarning,
  Truck,
  GraduationCap,
  Wrench,
  Wand2,
  User,
  Settings,
  Gauge,
  HardHat,
  Leaf,
  Users,
  GitMerge,
  Compass,
  ShieldCheck,
  FlaskConical,
  AlertCircle,
  BellRing,
  MapPin,
  Trash2,
  Map,
  Award,
  Users2,
} from "lucide-react"

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface NavGroup {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  iconBg: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: "Pilotage QHSE",
    subtitle: "Managez votre système QHSE efficacement",
    icon: Gauge,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    items: [
      { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
      { name: "Non-conformités", href: "/non-conformances", icon: AlertTriangle },
      { name: "CAPA", href: "/capa", icon: CheckSquare },
      { name: "Audits", href: "/audits", icon: ClipboardList },
      { name: "Plan d'actions", href: "/action-plan", icon: ListTodo },
      { name: "Objectifs et indicateurs", href: "/indicators", icon: BarChart2 },
      { name: "Gestion des processus", href: "/processes", icon: GitMerge },
      { name: "Contexte et enjeux", href: "/context", icon: Compass },
      { name: "Gestion documentaire", href: "/documents", icon: FileText },
      { name: "Générer un document", href: "/documents/generate", icon: Wand2 },
      { name: "Réclamations clients", href: "/complaints", icon: MessageSquareWarning },
      { name: "Fournisseurs", href: "/suppliers", icon: Truck },
    ],
  },
  {
    title: "Sécurité",
    subtitle: "Assurez la sécurité de vos collaborateurs",
    icon: HardHat,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    items: [
      { name: "Document unique (DUERP)", href: "/document-unique", icon: ShieldCheck },
      { name: "Risques chimiques", href: "/chemical-risks", icon: FlaskConical },
      { name: "Accidents et incidents", href: "/incidents", icon: AlertCircle },
      { name: "Tests de situation d'urgence", href: "/emergency-tests", icon: BellRing },
      { name: "Visites sécurité terrain", href: "/safety-visits", icon: MapPin },
      { name: "Plan de prévention", href: "/prevention-plan", icon: ShieldCheck },
      { name: "Registre des risques", href: "/risks", icon: ShieldAlert },
      { name: "Équipements", href: "/equipment", icon: Wrench },
    ],
  },
  {
    title: "Environnement",
    subtitle: "Veillez sur vos objectifs environnementaux",
    icon: Leaf,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    items: [
      { name: "Impacts et risques env.", href: "/env-impacts", icon: Leaf },
      { name: "Risques chimiques env.", href: "/env-chemical", icon: FlaskConical },
      { name: "Tests de situation d'urgence", href: "/env-emergency", icon: BellRing },
      { name: "Gestion des déchets", href: "/waste", icon: Trash2 },
      { name: "Visites environnement terrain", href: "/env-visits", icon: Map },
    ],
  },
  {
    title: "Ressources humaines",
    subtitle: "Facilitez la gestion des formations et compétences",
    icon: Users,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    items: [
      { name: "Formations", href: "/training", icon: GraduationCap },
      { name: "Compétences et polyvalence", href: "/skills", icon: Award },
      { name: "Entretiens individuels", href: "/interviews", icon: Users2 },
      { name: "Mon profil", href: "/profile", icon: User },
      { name: "Paramètres", href: "/settings", icon: Settings },
    ],
  },
]

export function isItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  if (href === "/documents/generate") return pathname === "/documents/generate"
  if (href === "/documents") return pathname.startsWith("/documents") && pathname !== "/documents/generate"
  return pathname.startsWith(href)
}

export function isGroupActive(pathname: string, group: NavGroup): boolean {
  return group.items.some((item) => isItemActive(pathname, item.href))
}
