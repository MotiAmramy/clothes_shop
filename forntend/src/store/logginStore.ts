import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    token: string;
}

interface AuthState {
    user: AuthUser | null;
    isLoggedIn: boolean;
    login: (data: AuthUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            isAdmin: false,
            login: (userData) => set({
                user: userData,
                isLoggedIn: true,
            }),
            logout: () => set({
                user: null,
                isLoggedIn: false,
            })
        }),
        {
            name: "auth-storage",
        }
    )
)