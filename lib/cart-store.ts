import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
  isCustom?: boolean
  measurements?: {
    bust?: string
    waist?: string
    hips?: string
    armLength?: string
    garmentLength?: string
    shoulderWidth?: string
    notes?: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        console.log("[v0] Cart store addItem called with:", item)
        const items = get().items
        const existingItem = !item.isCustom ? items.find((i) => i.id === item.id && !i.isCustom) : null

        if (existingItem) {
          console.log("[v0] Updating existing item quantity")
          set({
            items: items.map((i) => (i.id === item.id && !i.isCustom ? { ...i, quantity: i.quantity + 1 } : i)),
          })
        } else {
          const newItem = item.isCustom
            ? { ...item, id: Date.now() + Math.random(), quantity: 1 }
            : { ...item, quantity: 1 }
          console.log("[v0] Adding new item to cart:", newItem)
          set({ items: [...items, newItem] })
        }
        console.log("[v0] Cart items after add:", get().items)
      },

      removeItem: (id) => {
        console.log("[v0] Removing item from cart:", id)
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        console.log("[v0] Updating quantity for item:", id, "to:", quantity)
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        console.log("[v0] Clearing cart")
        set({ items: [] })
      },

      toggleCart: () => {
        console.log("[v0] Toggling cart, current state:", get().isOpen)
        set({ isOpen: !get().isOpen })
      },

      getTotalItems: () => {
        const total = get().items.reduce((total, item) => total + item.quantity, 0)
        console.log("[v0] Total items in cart:", total)
        return total
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "si-chic-cart",
    },
  ),
)
