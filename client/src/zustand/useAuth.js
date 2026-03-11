import { create } from "zustand";
import {persist} from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,

            setUser: (userData) => set({
                isAuthenticated: true,
                user: userData
            }),
            clearUser: () => set({
                isAuthenticated: false,
                user: null
            })
        }),
        {
           name: "user" // key in local-storage 
        }
    )
)

export default useAuthStore