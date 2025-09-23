import { NextResponse } from "next/server"
import { cache } from "@/lib/redis"

// Mock product data for Si-Chic
const mockProducts = [
  {
    id: 1,
    name: "Hijab Professionnel Élégance",
    price: 25000,
    originalPrice: 30000,
    image: "/elegant-hijab-professional.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    material: "Soie premium",
    colors: ["Rose poudré", "Champagne", "Gris perle"],
    customizable: true,
  },
  {
    id: 2,
    name: "Abaya Moderne Sénégalaise",
    price: 45000,
    originalPrice: 55000,
    image: "/modern-abaya-senegalese.jpg",
    rating: 4.9,
    reviews: 89,
    badge: "Premium",
    material: "Coton bio",
    colors: ["Noir", "Bleu marine", "Bordeaux"],
    customizable: true,
  },
  {
    id: 3,
    name: "Ensemble Bureau Chic",
    price: 35000,
    originalPrice: 42000,
    image: "/office-outfit-hijab.jpg",
    rating: 4.7,
    reviews: 156,
    badge: "Nouveau",
    material: "Polyester stretch",
    colors: ["Beige", "Rose", "Gris"],
    customizable: true,
  },
]

export async function GET() {
  try {
    // Try to get products from cache first
    const cachedProducts = await cache.getProducts()

    if (cachedProducts) {
      const products = typeof cachedProducts === "string" ? JSON.parse(cachedProducts) : cachedProducts
      return NextResponse.json(products)
    }

    // If not in cache, return mock data and cache it
    await cache.setProducts(mockProducts, 3600) // Cache for 1 hour

    return NextResponse.json(mockProducts)
  } catch (error) {
    console.error("Products API error:", error)
    // Fallback to mock data if Redis fails
    return NextResponse.json(mockProducts)
  }
}
