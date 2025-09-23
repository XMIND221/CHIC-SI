"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Palette, Check } from "lucide-react"

const themes = [
  {
    id: "brown-burgundy",
    name: "Élégance Classique",
    colors: {
      primary: "#8B4513",
      secondary: "#8B1538",
      accent: "#D2B48C",
    },
  },
  {
    id: "burgundy-rose",
    name: "Romance Moderne",
    colors: {
      primary: "#8B1538",
      secondary: "#E6A8A8",
      accent: "#F5F5DC",
    },
  },
  {
    id: "beige-mustard",
    name: "Chaleur Naturelle",
    colors: {
      primary: "#F5F5DC",
      secondary: "#DAA520",
      accent: "#2F4F4F",
    },
  },
  {
    id: "red-emerald",
    name: "Contraste Audacieux",
    colors: {
      primary: "#DC143C",
      secondary: "#50C878",
      accent: "#F8F8FF",
    },
  },
]

interface ThemeSelectorProps {
  onThemeChange?: (theme: (typeof themes)[0]) => void
}

export default function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeSelect = (theme: (typeof themes)[0]) => {
    setSelectedTheme(theme)
    onThemeChange?.(theme)

    // Appliquer le thème au document
    const root = document.documentElement
    root.style.setProperty("--theme-primary", theme.colors.primary)
    root.style.setProperty("--theme-secondary", theme.colors.secondary)
    root.style.setProperty("--theme-accent", theme.colors.accent)

    // Sauvegarder dans localStorage
    localStorage.setItem("si-chic-theme", JSON.stringify(theme))

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Palette className="w-4 h-4" />
          Personnaliser
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choisissez votre style</DialogTitle>
          <DialogDescription>Sélectionnez une palette de couleurs qui vous correspond</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedTheme.id === theme.id ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{theme.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>
                {selectedTheme.id === theme.id && <Check className="w-5 h-5 text-rose-600" />}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
