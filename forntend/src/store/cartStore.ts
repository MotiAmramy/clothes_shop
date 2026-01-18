import { create } from "zustand";
import { ProductItemData } from "../hooks/useFetchProducts";
import { fetchCart, syncCart } from "../api/cartApi";
import { useAuthStore } from "./logginStore";

interface CartStore {
    readonly cart: ReadonlyArray<ProductItemData>
    readonly addItem: (item: ProductItemData) => void
    readonly removeItem: (id: number) => void
    readonly clearCart: () => void
    readonly loadCart: () => Promise<void>
}

// Helper to sync after state updates if logged in
const syncIfLoggedIn = (cart: ReadonlyArray<ProductItemData>) => {
    const { isLoggedIn } = useAuthStore.getState();
    if (isLoggedIn) {
        syncCart(cart).catch(console.error);
    }
};

const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addItem: (item) => {
        set((pre) => {
            const newCart = [...pre.cart, item];
            syncIfLoggedIn(newCart);
            return { ...pre, cart: newCart };
        });
    },
    removeItem: (itemId) => {
        set((pre) => {
            const newCart = pre.cart.filter(({ id }) => id !== itemId);
            syncIfLoggedIn(newCart);
            return { ...pre, cart: newCart };
        });
    },
    clearCart: () => set({ cart: [] }),
    loadCart: async () => {
        try {
            const cartItems = await fetchCart();
            // Need to cast because fetchCart returns ReadonlyArray but we are setting it relative to state
            // Actually fetchCart returns exactly what we need
            set({ cart: cartItems });
        } catch (e) {
            console.error("Failed to load cart", e);
        }
    }
}))

export default useCartStore
