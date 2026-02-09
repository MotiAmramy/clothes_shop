import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductItemData } from "../hooks/useFetchProducts";
import { fetchCart, syncCart } from "../api/cartApi";
import { useAuthStore } from "./logginStore";

interface CartStore {
    readonly cart: ReadonlyArray<ProductItemData>
    readonly addItem: (item: ProductItemData) => void
    readonly removeItem: (id: string) => void
    readonly clearCart: () => void
    readonly loadCart: () => Promise<void>
}

// Helper to sync after state updates if logged in

// Helper to sync after state updates if logged in
/**
 * Syncs the current cart with the backend database if the user is logged in.
 * @param cart Current cart items
 */
const syncIfLoggedIn = (cart: ReadonlyArray<ProductItemData>) => {
    const { isLoggedIn } = useAuthStore.getState();
    if (isLoggedIn) {
        syncCart(cart).catch(console.error);
    }
};


/**
 * Cart Store
 * 
 * Manages the shopping cart state.
 * Uses Zustand with persistence (local storage) to save cart items.
 * Syncs with the backend if the user is logged in.
 */
const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
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
                    const newCart = pre.cart.filter(({ _id }) => _id !== itemId);
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
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;
