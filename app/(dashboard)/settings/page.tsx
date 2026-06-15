"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, Settings, Bell, LayoutDashboard,
  CheckCircle2, AlertTriangle, CheckSquare, ClipboardList,
  FileText, MessageSquareWarning, Truck, GraduationCap,
  Wrench, ShieldAlert, Sun, Monitor, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { loadMerged, saveState } from "@/lib/storage"

const STORAGE_KEY = "qhse_settings"

interface SettingsState {
  general: { company: string; timezone: string; language: string; dateFormat: string; fiscalYear: string }
  certifications: string[]
  notifEmail: Record<string, boolean>
  notifPush: Record<string, boolean>
  moduleEnabled: Record<string, boolean>
  theme: "light" | "system"
  density: "comfortable" | "compact"
  sidebar: boolean
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${checked ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  )
}

const notifTypes = [
  { key: "nc_created",    label: "Nouvelle non-conformité",        icon: AlertTriangle,         color: "text-red-500"    },
  { key: "nc_overdue",    label: "NC en retard",                   icon: AlertTriangle,         color: "text-red-500"    },
  { key: "capa_action",   label: "Action CAPA à valider",          icon: CheckSquare,           color: "text-amber-500"  },
  { key: "audit_remind",  label: "Rappel d'audit",                 icon: ClipboardList,         color: "text-blue-500"   },
  { key: "doc_expiry",    label: "Document expiré",                icon: FileText,              color: "text-purple-500" },
  { key: "complaint",     label: "Nouvelle réclamation",           icon: MessageSquareWarning,  color: "text-orange-500" },
  { key: "supplier_eval", label: "Évaluation fournisseur requise", icon: Truck,                 color: "text-teal-500"   },
]

const modules = [
  { key: "documents",       label: "Documents",         icon: FileText,             color: "bg-purple-50 text-purple-600" },
  { key: "nc",              label: "Non-Conformités",   icon: AlertTriangle,        color: "bg-red-50 text-red-600"       },
  { key: "capa",            label: "CAPA",              icon: CheckSquare,          color: "bg-amber-50 text-amber-600"   },
  { key: "audits",          label: "Audits",            icon: ClipboardList,        color: "bg-blue-50 text-blue-600"     },
  { key: "risks",           label: "Risques",           icon: ShieldAlert,          color: "bg-red-50 text-red-700"       },
  { key: "complaints",      label: "Réclamations",      icon: MessageSquareWarning, color: "bg-orange-50 text-orange-600" },
  { key: "suppliers",       label: "Fournisseurs",      icon: Truck,                color: "bg-teal-50 text-teal-600"     },
  { key: "training",        label: "Formations",        icon: GraduationCap,        color: "bg-green-50 text-green-600"   },
  { key: "equipment",       label: "Équipements",       icon: Wrench,               color: "bg-slate-50 text-slate-600"   },
]

const DEFAULT_SETTINGS: SettingsState = {
  general: {
    company: "Industries QHSE SAS",
    timezone: "Europe/Paris",
    language: "fr",
    dateFormat: "dd/MM/yyyy",
    fiscalYear: "Janvier",
  },
  certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001", "IATF 16949"],
  notifEmail: {
    nc_created: true, nc_overdue: true, capa_action: true,
    audit_remind: true, doc_expiry: false, complaint: true, supplier_eval: false,
  },
  notifPush: {
    nc_created: true, nc_overdue: false, capa_action: true,
    audit_remind: false, doc_expiry: false, complaint: true, supplier_eval: false,
  },
  moduleEnabled: Object.fromEntries(modules.map((m) => [m.key, true])),
  theme: "light",
  density: "comfortable",
  sidebar: true,
}

export default function SettingsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const [general, setGeneral] = useState(DEFAULT_SETTINGS.general)
  const [certifications, setCertifications] = useState<string[]>(DEFAULT_SETTINGS.certifications)
  const [newCert, setNewCert] = useState("")
  const [addingCert, setAddingCert] = useState(false)
  const [notifEmail, setNotifEmail] = useState<Record<string, boolean>>(DEFAULT_SETTINGS.notifEmail)
  const [notifPush, setNotifPush] = useState<Record<string, boolean>>(DEFAULT_SETTINGS.notifPush)
  const [moduleEnabled, setModuleEnabled] = useState<Record<string, boolean>>(DEFAULT_SETTINGS.moduleEnabled)
  const [theme, setTheme] = useState<"light" | "system">(DEFAULT_SETTINGS.theme)
  const [density, setDensity] = useState<"comfortable" | "compact">(DEFAULT_SETTINGS.density)
  const [sidebar, setSidebar] = useState(DEFAULT_SETTINGS.sidebar)

  useEffect(() => {
    const s = loadMerged<SettingsState>(STORAGE_KEY, DEFAULT_SETTINGS)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable client-side after mount
    setGeneral(s.general)
    setCertifications(s.certifications)
    setNotifEmail(s.notifEmail)
    setNotifPush(s.notifPush)
    setModuleEnabled(s.moduleEnabled)
    setTheme(s.theme)
    setDensity(s.density)
    setSidebar(s.sidebar)
  }, [])

  const handleSave = () => {
    saveState<SettingsState>(STORAGE_KEY, {
      general, certifications, notifEmail, notifPush, moduleEnabled, theme, density, sidebar,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const addCert = () => {
    const v = newCert.trim()
    if (v && !certifications.includes(v)) {
      setCertifications([...certifications, v])
    }
    setNewCert("")
    setAddingCert(false)
  }

  const removeCert = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Back header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9 shrink-0" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-bold text-gray-900">Paramètres</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="general"><Settings className="h-3.5 w-3.5" />Général</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
            <TabsTrigger value="modules"><LayoutDashboard className="h-3.5 w-3.5" />Modules</TabsTrigger>
            <TabsTrigger value="appearance"><Sun className="h-3.5 w-3.5" />Apparence</TabsTrigger>
          </TabsList>
        </div>

        {/* ── Général ── */}
        <TabsContent value="general">
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Informations de l&apos;entreprise</CardTitle>
              </CardHeader>
              <CardContent className="pb-5 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Nom de l&apos;entreprise</Label>
                  <Input value={general.company} onChange={(e) => setGeneral({ ...general, company: e.target.value })} className="rounded-xl h-10" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-600">Fuseau horaire</Label>
                    <select
                      value={general.timezone}
                      onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="Europe/Paris">Europe/Paris (UTC+2)</option>
                      <option value="Europe/London">Europe/London (UTC+1)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-600">Langue</Label>
                    <select
                      value={general.language}
                      onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-600">Format de date</Label>
                    <select
                      value={general.dateFormat}
                      onChange={(e) => setGeneral({ ...general, dateFormat: e.target.value })}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                      <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                      <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-600">Début exercice fiscal</Label>
                    <select
                      value={general.fiscalYear}
                      onChange={(e) => setGeneral({ ...general, fiscalYear: e.target.value })}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Certifications suivies</CardTitle>
                <CardDescription className="text-xs">Normes pour lesquelles des alertes d&apos;échéance seront envoyées</CardDescription>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  {certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="select-none gap-1 border-blue-200 text-blue-700 pr-1">
                      {cert}
                      <button
                        type="button"
                        onClick={() => removeCert(cert)}
                        className="rounded-full p-0.5 hover:bg-blue-100"
                        aria-label={`Retirer ${cert}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {addingCert ? (
                    <span className="inline-flex items-center gap-1">
                      <Input
                        autoFocus
                        value={newCert}
                        onChange={(e) => setNewCert(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addCert()
                          if (e.key === "Escape") { setNewCert(""); setAddingCert(false) }
                        }}
                        onBlur={addCert}
                        placeholder="ISO 27001…"
                        className="h-7 w-32 rounded-lg text-xs"
                      />
                    </span>
                  ) : (
                    <Badge
                      variant="outline"
                      onClick={() => setAddingCert(true)}
                      className="cursor-pointer select-none border-dashed text-gray-400 hover:border-gray-400"
                    >
                      + Ajouter
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <SaveBar saved={saved} onSave={handleSave} />
          </div>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold text-gray-700">Préférences de notification</CardTitle>
              <CardDescription className="text-xs">Choisissez les événements pour lesquels vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="mb-3 grid grid-cols-3 text-right text-[10px] font-semibold uppercase tracking-wide text-gray-400 pr-1">
                <span className="col-span-1 text-left">Événement</span>
                <span>E-mail</span>
                <span>Push</span>
              </div>
              <div className="space-y-1">
                {notifTypes.map(({ key, label, icon: Icon, color }) => (
                  <div key={key} className="grid grid-cols-3 items-center rounded-xl px-1 py-2.5 hover:bg-gray-50">
                    <div className="col-span-1 flex items-center gap-2">
                      <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                    <div className="flex justify-end pr-3">
                      <Toggle
                        checked={notifEmail[key]}
                        onChange={() => setNotifEmail((p) => ({ ...p, [key]: !p[key] }))}
                      />
                    </div>
                    <div className="flex justify-end pr-1">
                      <Toggle
                        checked={notifPush[key]}
                        onChange={() => setNotifPush((p) => ({ ...p, [key]: !p[key] }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="mt-4"><SaveBar saved={saved} onSave={handleSave} /></div>
        </TabsContent>

        {/* ── Modules ── */}
        <TabsContent value="modules">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold text-gray-700">Modules actifs</CardTitle>
              <CardDescription className="text-xs">Activez ou désactivez les modules visibles dans la navigation</CardDescription>
            </CardHeader>
            <CardContent className="pb-5 space-y-1">
              {modules.map(({ key, label, icon: Icon, color }) => (
                <div key={key} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color.split(" ")[0]} `}>
                      <Icon className={`h-4 w-4 ${color.split(" ")[1]}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                  </div>
                  <Toggle
                    checked={moduleEnabled[key]}
                    onChange={() => setModuleEnabled((p) => ({ ...p, [key]: !p[key] }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="mt-4"><SaveBar saved={saved} onSave={handleSave} /></div>
        </TabsContent>

        {/* ── Apparence ── */}
        <TabsContent value="appearance">
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Thème</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "light" as const, icon: Sun,     label: "Clair",   preview: "bg-white border-2" },
                    { val: "system" as const,icon: Monitor,  label: "Système", preview: "bg-gradient-to-br from-white to-gray-800 border-2" },
                  ].map(({ val, icon: Icon, label, preview }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTheme(val)}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${theme === val ? "border-2 border-blue-500 bg-blue-50" : "border border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className={`h-12 w-full rounded-lg ${preview} ${theme === val ? "border-blue-300" : "border-gray-200"}`}>
                        <div className="flex items-center gap-1 p-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Densité d&apos;affichage</CardTitle>
              </CardHeader>
              <CardContent className="pb-5 space-y-2">
                {[
                  { val: "comfortable" as const, label: "Confortable", desc: "Plus d'espacement pour une meilleure lisibilité" },
                  { val: "compact" as const,      label: "Compact",     desc: "Plus d'éléments visibles à l'écran" },
                ].map(({ val, label, desc }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDensity(val)}
                    className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${density === val ? "border-2 border-blue-500 bg-blue-50" : "border border-gray-200 hover:border-gray-300"}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                    {density === val && <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sidebar réduite par défaut</p>
                    <p className="text-xs text-gray-400">Afficher uniquement les icônes au démarrage</p>
                  </div>
                  <Toggle checked={!sidebar} onChange={() => setSidebar(!sidebar)} />
                </div>
              </CardContent>
            </Card>

            <SaveBar saved={saved} onSave={handleSave} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SaveBar({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl" onClick={onSave}>
        Enregistrer les modifications
      </Button>
      {saved && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <CheckCircle2 className="h-4 w-4" /> Enregistré
        </span>
      )}
    </div>
  )
}
