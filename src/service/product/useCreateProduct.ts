import { ProductFormValues } from "@/components/app-product-form";
import { queryClient } from "@/service";
import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";

interface Product {
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

interface ResponseProduct {
  message: Product;
}

const createProduct = async (product: ProductFormValues) => {
  const access_token = getCookieValue("access_token");

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append("price", String(product.price));
  formData.append("stock", String(product.stock));
  formData.append("sku", product.sku);

  product.images.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await api.post<ResponseProduct>("/auth/product", formData, {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
      "Content-Type": "multipart/form-data",
    },
  });

  return data.message;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
