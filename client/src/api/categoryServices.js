import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

// getting all categories
export const useCategories = () => {
    return useQuery({
        queryKey:['categories'],
        queryFn: async () => {
            const res = await apiRequest.get('/categories')
            return res.data.data
        }
    })
}