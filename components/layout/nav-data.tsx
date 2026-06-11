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
  ClipboardCheck,
  BookOpen,
  Star,
  Globe,
  UtensilsCrossed,
  Scale,
  Brain,
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
      { name: "Knowledge Management", href: "/km", icon: Brain },
      { name: "Mon profil", href: "/profile", icon: User },
      { name: "Paramètres", href: "/settings", icon: Settings },
    ],
  },
  {
    title: "Diagnostics & Conformité",
    subtitle: "Évaluez la maturité de vos systèmes de management",
    icon: ClipboardCheck,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    items: [
      { name: "Hub Diagnostics", href: "/diagnostics", icon: ClipboardCheck },
      { name: "SMQHSE (ISO 9001/14001/45001)", href: "/diagnostics/smqhse", icon: ShieldCheck },
      { name: "SMSI (ISO 27001)", href: "/diagnostics/smsi", icon: ShieldAlert },
      { name: "FSSC 22000", href: "/diagnostics/fssc", icon: UtensilsCrossed },
      { name: "ISO 37001 Anti-corruption", href: "/diagnostics/iso37001", icon: Scale },
      { name: "Knowledge Management (KM)", href: "/diagnostics/km", icon: BookOpen },
      { name: "Expérience Client (CX)", href: "/diagnostics/cx", icon: Star },
      { name: "ESG / CSRD / GRI", href: "/diagnostics/esg", icon: Globe },
    ],
  },
  {
    title: "Expérience Client",
    subtitle: "Pilotage CX, NPS, parcours et satisfaction client",
    icon: Star,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    items: [
      { name: "Tableau de bord CX", href: "/cx", icon: BarChart2 },
      { name: "Parcours clients", href: "/cx/journey", icon: Map },
      { name: "NPS & Enquêtes VoC", href: "/cx/voc", icon: MessageSquareWarning },
      { name: "Personas clients", href: "/cx/personas", icon: Users2 },
    ],
  },
  {
    title: "ESG & Durabilité",
    subtitle: "Stratégie ESG, reporting CSRD et bilan carbone",
    icon: Leaf,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    items: [
      { name: "Tableau de bord ESG", href: "/esg", icon: Globe },
      { name: "Émissions GES (Scope 1/2/3)", href: "/esg/ghg", icon: BarChart2 },
      { name: "Matérialité double", href: "/esg/materiality", icon: GitMerge },
      { name: "Rapport CSRD", href: "/esg/report", icon: FileText },
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
