import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"
import Link from "next/link"

async function logout() {
  "use server"
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const user = data.user

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gray-900">Mon Compte</h1>
              <p className="text-gray-600">Gérez vos informations et commandes</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Retour au site</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-rose-600" />
                </div>
                <CardTitle className="text-lg">
                  {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                </CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Compte vérifié
                </Badge>
              </CardHeader>
            </Card>

            <div className="mt-6 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4 mr-3" />
                Informations personnelles
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Package className="w-4 h-4 mr-3" />
                Mes commandes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-3" />
                Ma wishlist
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Paramètres
              </Button>
              <form action={logout}>
                <Button type="submit" variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </Button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-rose-600" />
                    Mes Commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande.</p>
                  <Button asChild className="bg-rose-600 hover:bg-rose-700">
                    <Link href="/">Découvrir nos produits</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-rose-600" />
                    Ma Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Votre liste de souhaits est vide.</p>
                  <Button variant="outline" asChild>
                    <Link href="/">Ajouter des produits</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Prénom</label>
                    <p className="text-gray-900">{user.user_metadata?.first_name || "Non renseigné"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <p className="text-gray-900">{user.user_metadata?.last_name || "Non renseigné"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Membre depuis</label>
                    <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">Modifier mes informations</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
