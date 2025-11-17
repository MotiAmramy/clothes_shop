import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface User {
    id: string
    name: string
    password: string
    role: "user" | "admin"
}

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    isAdmin: boolean
    login: (userData: User) => void
    logout: () => void
}

const add = () => (hi:string) => 45 + hi
add()

export const useAuthStore = create<AuthState>()(
persist(
        (set) => ({
            isAdmin: false,
            user: null,
            isLoggedIn: false,
            login: (userData) => set({
                user: userData,
                isLoggedIn: true,
                isAdmin: userData.role === "admin"
            }),
            logout: () => set({
                user: null,
                isLoggedIn: false,
                isAdmin: false
            })
        }),
            {
                name: "auth-storage",
            }
    )
)