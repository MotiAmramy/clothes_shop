import { create } from "zustand";
import { ProductItemData } from "../hooks/useFetchProducts";

interface CartStore {
    readonly cart: ReadonlyArray<ProductItemData>
    readonly addItem: (item: ProductItemData) => void
    readonly removeItem: (id: number) => void
}

const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addItem: (item) => set((pre) => ({ ...pre, cart: [...pre.cart, item ] })),
    removeItem: (itemId) => set((pre) => ({
        ...pre, 
        cart: pre.cart.filter(({ id }) => id !== itemId )
    }))
}))

export default useCartStore