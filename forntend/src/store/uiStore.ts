import { create } from "zustand";
import { ProductItemData } from "../hooks/useFetchProducts";

interface UiState {
    selectedProduct: ProductItemData | null;
    isModalOpen: boolean;
    openModal: (product: ProductItemData) => void;
    closeModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    selectedProduct: null,
    isModalOpen: false,
    openModal: (product) => set({ selectedProduct: product, isModalOpen: true }),
    closeModal: () => set({ selectedProduct: null, isModalOpen: false }),
}));
