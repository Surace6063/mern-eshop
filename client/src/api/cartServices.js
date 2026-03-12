import { useQuery, useMutation } from "@tanstack/react-query";
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