import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import useAuthStore from "../zustand/useAuth";

// get user cart
export const useUserCart = () => {
    const {isAuthenticated} = useAuthStore()

    return useQuery({
        queryKey:['user-cart'],
        queryFn: async () => {
            const res = await apiRequest.get('/cart')
            return res.data
        },
        enabled: isAuthenticated
    })
}

// add to cart
export const useAddToCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload) => {
           await apiRequest.post('/cart',payload)
        },
        onSuccess: () => {
            // refetch or invalidate useUserCart after adding new item to cart
           queryClient.invalidateQueries({queryKey:['user-cart']})
        }
    })
}