"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Filter, Grid, List, Trash2, Edit, Download, Eye } from "lucide-react"
import { useState } from "react"

const mediaFiles = [
  {
    id: 1,
    name: "hero-background.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-15",
    usedIn: ["Page d'accueil", "Section héro"],
    url: "/elegant-hijab-woman.png",
  },
  {
    id: 2,
    name: "product-blazer-1.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "800x1200",
    uploadDate: "2024-01-14",
    usedIn: ["Produits", "Catalogue"],
    url: "/professional-blazer.png",
  },
  {
    id: 3,
    name: "category-hijabs.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "600x400",
    uploadDate: "2024-01-13",
    usedIn: ["Catégories"],
    url: "/placeholder-dl29n.png",
  },
  {
    id: 4,
    name: "logo-si-chic.svg",
    type: "vector",
    size: "24 KB",
    dimensions: "Vector",
    uploadDate: "2024-01-10",
    usedIn: ["Header", "Footer", "Emails"],
    url: "/si-chic-logo.png",
  },
  {
    id: 5,
    name: "testimonial-video.mp4",
    type: "video",
    size: "15.6 MB",
    dimensions: "1080x1920",
    uploadDate: "2024-01-12",
    usedIn: ["Témoignages"],
    url: "/video-testimonial.png",
  },
  {
    id: 6,
    name: "pattern-islamic.png",
    type: "image",
    size: "890 KB",
    dimensions: "500x500",
    uploadDate: "2024-01-11",
    usedIn: ["Décoration", "Backgrounds"],
    url: "/islamic-pattern.png",
  },
]

export default function MediaManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])

  const filteredFiles = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.usedIn.some((usage) => usage.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-blue-100 text-blue-800"
      case "vector":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des médias</h1>
              <p className="text-gray-600 mt-2">Gérez vos images, vidéos et fichiers</p>
            </div>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Upload className="w-4 h-4 mr-2" />
              Télécharger des fichiers
            </Button>
          </div>

          {/* Barre d'outils */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher des fichiers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                  {selectedFiles.length > 0 && (
                    <Badge variant="secondary">{selectedFiles.length} fichier(s) sélectionné(s)</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {selectedFiles.length > 0 && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  )}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grille/Liste des fichiers */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                          className="rounded"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{file.size}</span>
                        <span>{file.dimensions}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {file.usedIn.map((usage, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {usage}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">{file.uploadDate}</span>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" className="rounded" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fichier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taille
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisé dans
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFiles.map((file) => (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={() => toggleFileSelection(file.id)}
                              className="rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded mr-3"
                              />
                              <span className="font-medium text-gray-900">{file.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {file.usedIn.map((usage, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {usage}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploadDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
