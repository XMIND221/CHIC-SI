"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, SettingsIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import useSWR, { mutate } from "swr"

interface Setting {
  id: string
  key: string
  value: string
  category: string
  label: string
  description: string | null
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SettingsPage() {
  const { data: settings, isLoading } = useSWR<Setting[]>("/api/settings", fetcher)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    if (settings) {
      const values: Record<string, string> = {}
      settings.forEach((setting) => {
        values[setting.key] = setting.value
      })
      setEditedValues(values)
    }
  }, [settings])

  const handleSave = async (key: string) => {
    setSaving(key)
    try {
      const response = await fetch(`/api/settings/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editedValues[key] }),
      })

      if (!response.ok) throw new Error("Failed to update setting")

      await mutate("/api/settings")
      alert("✅ Paramètre mis à jour avec succès!")
    } catch (error) {
      console.error("[v0] Error saving setting:", error)
      alert("❌ Erreur lors de la mise à jour")
    } finally {
      setSaving(null)
    }
  }

  const groupedSettings = settings?.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    },
    {} as Record<string, Setting[]>,
  )

  const categoryLabels: Record<string, string> = {
    general: "Général",
    contact: "Contact",
    about: "À Propos",
    hero: "Page d'Accueil",
    appearance: "Apparence", // Added appearance category
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold">Paramètres du Site</h1>
            <p className="text-muted-foreground">Modifiez les informations affichées sur votre site</p>
          </div>
        </div>

        {/* Settings by Category */}
        {groupedSettings &&
          Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <Card key={category} className="p-6">
              <h2 className="text-xl font-semibold mb-6">{categoryLabels[category] || category}</h2>
              <div className="space-y-6">
                {categorySettings.map((setting) => (
                  <div key={setting.key} className="space-y-2">
                    <Label htmlFor={setting.key}>{setting.label}</Label>
                    {setting.description && <p className="text-sm text-muted-foreground">{setting.description}</p>}
                    <div className="flex gap-2">
                      {setting.key.includes("color") ? (
                        <div className="flex gap-2 flex-1">
                          <Input
                            type="color"
                            id={setting.key}
                            value={editedValues[setting.key] || "#000000"}
                            onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={editedValues[setting.key] || ""}
                            onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      ) : setting.key.includes("description") ||
                        setting.key.includes("subtitle") ||
                        setting.key.includes("info") ? (
                        <Textarea
                          id={setting.key}
                          value={editedValues[setting.key] || ""}
                          onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                          rows={3}
                          className="flex-1"
                        />
                      ) : (
                        <Input
                          id={setting.key}
                          value={editedValues[setting.key] || ""}
                          onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                          className="flex-1"
                        />
                      )}
                      <Button
                        onClick={() => handleSave(setting.key)}
                        disabled={saving === setting.key || editedValues[setting.key] === setting.value}
                        className="shrink-0"
                      >
                        {saving === setting.key ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
      </div>
    </AdminLayout>
  )
}
