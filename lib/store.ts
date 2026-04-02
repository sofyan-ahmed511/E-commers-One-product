import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: { name: string; hex: string };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (i) => i.productId === item.productId && i.size === item.size && i.color.name === item.color.name
        );

        if (existingItemIndex > -1) {
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity += item.quantity;
          set({ items: newItems });
        } else {
          set({ items: [...currentItems, { ...item, id: Math.random().toString(36).substring(7) }] });
        }
        get().openCart();
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearCart: () => set({ items: [] }),
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      get totalPrice() {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'lumora-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
)

interface UIStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPreloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  isPreloaderDone: false,
  setPreloaderDone: (done) => set({ isPreloaderDone: done }),
}));
