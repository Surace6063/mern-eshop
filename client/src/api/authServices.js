import { useMutation } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

// register user
export const useRegisterUser = () => {
    return useMutation({
    mutationFn: async (registerData) => {
      const response =  await apiRequest.post("/auth/register", registerData)
      return response.data
    }
  })
}

// verify email token
export const useEmailVerifyToken = () => {
    return useMutation({
    mutationFn: async (tokenData) => {
      const response =  await apiRequest.post("/auth/verify-token", tokenData)
      return response.data
    }
  })
}

// login user
export const useLoginUser = () => {
    return useMutation({
    mutationFn: async (loginData) => {
      const response =  await apiRequest.post("/auth/login", loginData)
      return response.data
    }
  })
}

// logout user
export const useLogoutUser = () => {
    return useMutation({
    mutationFn: async () => {
      const response =  await apiRequest.post("/auth/logout")
      return response.data
    }
  })
}