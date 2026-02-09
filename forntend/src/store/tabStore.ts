

import { create } from "zustand";

interface TabStore {
    activeTab: "users" | "products" | "categories";
    setActiveTab: (tab: "users" | "products" | "categories") => void;
}


/**
 * Admin Tab Store
 * 
 * Manages the active tab in the Admin Dashboard (Users, Products, Categories).
 */
export const useAdminStore = create<TabStore>((set) => ({
    activeTab: "users",
    setActiveTab: (tab: TabStore["activeTab"]) => set({ activeTab: tab }),
}));