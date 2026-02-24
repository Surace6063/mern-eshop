import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

// getting products
export const useProducts = ({
  limit = 10,
  category = "",
  minPrice = "",
  maxPrice = "", 
  sort = "",
  page = 1
} = {}) => {
  return useQuery({
    queryKey: ["products",limit,category,minPrice,maxPrice,sort,page],
    queryFn: async () => {
      let params = {}
      if(limit) params.limit = limit
      if(category) params.category_slug = category
      if(minPrice) params.minPrice = minPrice
      if(maxPrice) params.maxPrice = maxPrice
      if(sort) params.sort = sort
      if(page) params.page = page

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
