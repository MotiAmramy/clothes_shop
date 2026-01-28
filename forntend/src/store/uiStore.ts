import { create } from "zustand";
import { ProductItemData } from "../hooks/useFetchProducts";

interface UiState {
    selectedProduct: ProductItemData | null;
    isModalOpen: boolean;
    openModal: (product: ProductItemData) => void;
    closeModal: () => void;

    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;

    isCheckoutOpen: boolean;
    openCheckout: () => void;
    closeCheckout: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    selectedProduct: null,
    isModalOpen: false,
    openModal: (product) => set({ selectedProduct: product, isModalOpen: true }),
    closeModal: () => set({ selectedProduct: null, isModalOpen: false }),

    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),

    isCheckoutOpen: false,
    openCheckout: () => set({ isCheckoutOpen: true }),
    closeCheckout: () => set({ isCheckoutOpen: false }),
}));
