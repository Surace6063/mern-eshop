import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

// getting products
export const useProducts = ({
  limit = 10,
  category = "",
  minPrice = "",
  maxPrice = "", 
  sort = "",
  page = 1,
  search=""
} = {}) => {
  return useQuery({
    queryKey: ["products",limit,category,minPrice,maxPrice,sort,page,search],
    queryFn: async () => {
      let params = {}
      if(limit) params.limit = limit
      if(category) params.category_slug = category
      if(minPrice) params.minPrice = minPrice
      if(maxPrice) params.maxPrice = maxPrice
      if(sort) params.sort = sort
      if(page) params.page = page
      if(search) params.search = search

      const res = await apiRequest.get("/products",{params})
      return res.data.data;
    },
  });
};


// getting single product using slug
export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product",slug],
    queryFn: async () => {
      const res = await apiRequest.get(`/products/${slug}`)
      return res.data;
    }
  })
}


// add new product
export const useAddProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (payload) => {
      await apiRequest.post("/products",payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]})
    }
  })
}


// delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (slug) => {
      await apiRequest.delete(`/products/${slug}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]})
    },
    onError: (error) => {
      console.log(error)
    }
  })
}


// update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({slug,payload}) => {
      await apiRequest.patch(`/products/${slug}`,payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]})
    },
    onError: (error) => {
      console.log(error)
    }
  })
}