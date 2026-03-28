import { create } from "zustand"
import { persist } from "zustand/middleware"
import apiRequest from "../utils/apiRequest"

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (user) => set({ isAuthenticated: true, user }),

      clearUser: () => set({ isAuthenticated: false, user: null }),

      fetchCurrentUser: async () => {
        try {
          const response = await apiRequest.get("/profile/me")
          const userData = response.data.user
          console.log(userData)
          set({ isAuthenticated: true, user: userData })
        } catch (error) {
          set({ isAuthenticated: false, user: null })
        }
      }
    }),
    {
      name: "user" // key in localStorage
    }
  )
)

export default useAuthStore
