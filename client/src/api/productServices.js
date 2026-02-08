import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// getting products
export const useProducts = ({limit=10,offset=0}) => {
  return useQuery({
    queryKey: ["products",limit,offset],
    queryFn: async () => {
      const res = await axios.get("https://api.escuelajs.co/api/v1/products", {
        params: {
          limit,
          offset,
        },
      });
      return res.data;
    },
  });
};


// getting single product using slug
export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product",slug],
    queryFn: async () => {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
      return res.data;
    }
  })
}
