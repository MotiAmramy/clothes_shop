

import { create } from "zustand";

interface TabStore {
    activeTab: "users" | "products";
    setActiveTab: (tab: "users" | "products") => void;
}

export const useAdminStore = create<TabStore>((set) => ({
    activeTab: "users",
    setActiveTab: (tab: TabStore["activeTab"]) => set({ activeTab: tab }),
}));