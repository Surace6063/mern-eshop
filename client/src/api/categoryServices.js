import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// add category
export const useAddCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload) => {
            await apiRequest.post('/categories', payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['categories']})
        },
        onError: (error) => {
            console.log(error)
        }
    })
}


// delete category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            await apiRequest.delete(`/categories/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['categories']})
        },
        onError: (error) => {
            console.log(error)
        }
    })
}


// update category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({id,payload}) => {
            await apiRequest.patch(`/categories/${id}`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['categories']})
        },
        onError: (error) => {
            console.log(error)
        }
    })
}