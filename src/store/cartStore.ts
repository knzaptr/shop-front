import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items;
        const existing = items.find((p) => p.id === product.id);

        if (existing) {
          set({
            items: items.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((p) => p.id !== id) }),

      increaseQty: (id) =>
        set({
          items: get().items.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        }),

      decreaseQty: (id) =>
        set({
          items: get()
            .items.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, p) => sum + p.price * p.quantity, 0),
    }),
    {
      name: "cart-storage", // nom de la clé dans localStorage
    }
  )
);
