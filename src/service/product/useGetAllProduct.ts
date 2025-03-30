import { api, getCookieValue } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  created_at: string;
}

interface GetAllProductsResponse {
  message: Product[];
}

const getAllProducts = async (): Promise<Product[]> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.get<GetAllProductsResponse>("/auth/product", {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  });

  return data?.message ?? [];
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};
