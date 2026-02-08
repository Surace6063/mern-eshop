import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// getting all categories
export const useCategories = () => {
    return useQuery({
        queryKey:['categories'],
        queryFn: async () => {
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories')
            return res.data
        }
    })
}