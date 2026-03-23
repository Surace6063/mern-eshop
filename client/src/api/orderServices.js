import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import useAuthStore from "../zustand/useAuth";

// get orders
export const useGetOrders = () => {
    const {isAuthenticated} = useAuthStore()

    return useQuery({
        queryKey:['orders'],
        queryFn: async () => {
            const res = await apiRequest.get('/orders')
            return res.data
        },
        enabled: isAuthenticated
    })
}


// create order
export const useCreateOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload) => {
          const res =  await apiRequest.post('/orders',payload)
          return res.data
        },
        onSuccess: () => {
            // refetch or invalidate orders after creating new order
           queryClient.invalidateQueries({queryKey:['orders','user-cart']})
        },
        onError: (error) => {
          console.log(error)
        }
    })
}