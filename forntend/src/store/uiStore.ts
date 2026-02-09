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

    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}


/**
 * UI Store
 * 
 * Manages global UI state such as modal visibility (Product, Cart, Checkout, Sidebar).
 * Allows components to trigger UI changes without passing props deep down.
 */
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

    isSidebarOpen: false,
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
}));
