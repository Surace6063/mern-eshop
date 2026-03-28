import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../utils/apiRequest"
import useAuthStore from "../zustand/useAuth"

// register user
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (registerData) => {
      const response = await apiRequest.post("/auth/register", registerData)
      return response.data
    }
  })
}

// verify email token
export const useEmailVerifyToken = () => {
  return useMutation({
    mutationFn: async (tokenData) => {
      const response = await apiRequest.post("/auth/verify-token", tokenData)
      return response.data
    }
  })
}

// login user
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      const response = await apiRequest.post("/auth/login", loginData)
      return response.data
    }
  })
}

// logout user
export const useLogoutUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest.post("/auth/logout")
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['profile']})
    }
  })
}

// get user profile
export const useUserProfile = () => {
  const {isAuthenticated} = useAuthStore()

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await apiRequest.get("/profile/me")
      return res.data
    },
    enabled: isAuthenticated
  })
}
