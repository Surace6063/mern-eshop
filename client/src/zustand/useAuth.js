import { create } from "zustand"
import { persist } from "zustand/middleware"
import apiRequest from "../utils/apiRequest"

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (userData) =>
        set({
          isAuthenticated: true,
          user: userData
        }),
      clearUser: () =>{
        set({
          isAuthenticated: false,
          user: null
        })

        // 🔥 CLEAR PERSISTED STORAGE PROPERLY
        useAuthStore.persist.clearStorage()
      },
      fetchCurrentUser: async () => {
        try {
          const response = await apiRequest.get("/profile/me")
          const userData = response.data.user
          set({ isAuthenticated: true, user: userData })
        } catch (error) {
          set({ isAuthenticated: false, user: null })
        }
      }
    }),
    {
      name: "user" // key in local-storage
    }
  )
)

export default useAuthStore
