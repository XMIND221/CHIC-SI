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
        const items = get().items
        const existingItem = !item.isCustom ? items.find((i) => i.id === item.id && !i.isCustom) : null

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id && !i.isCustom ? { ...i, quantity: i.quantity + 1 } : i)),
          })
        } else {
          const newItem = item.isCustom
            ? { ...item, id: Date.now() + Math.random(), quantity: 1 }
            : { ...item, quantity: 1 }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
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
