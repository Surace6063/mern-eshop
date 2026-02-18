import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

// getting products
export const useProducts = ({
  limit = 10
} = {}) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let params = {}
      if(limit) params.limit = limit

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
