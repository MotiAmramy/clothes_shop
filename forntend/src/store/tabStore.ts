

import { create } from "zustand";

interface TabStore {
    activeTab: "users" | "products" | "categories";
    setActiveTab: (tab: "users" | "products" | "categories") => void;
}

export const useAdminStore = create<TabStore>((set) => ({
    activeTab: "users",
    setActiveTab: (tab: TabStore["activeTab"]) => set({ activeTab: tab }),
}));