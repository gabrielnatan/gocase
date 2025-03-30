import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AppProductListItemSelect } from "../app-product-select";
import { useGetAllProducts } from "@/service/product/useGetAllProduct";

const categories = ["Todas", "Capas de celular", "Roupas", "Mochilas"];

interface ProductSelectorProps {
  onSelect: (ids: string[]) => void;
}

export const ProductSelector = ({ onSelect }: ProductSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { data: products = [], isLoading } = useGetAllProducts();

  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCheck = (id: string, checked: boolean) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  return (
    <div className="w-full max-w-[700px] p-6 bg-white border rounded-2xl">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-semibold">Selecionar Produtos</h2>

        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button
            className="bg-green-800 hover:bg-green-900 cursor-pointer"
            variant="default"
            onClick={() => onSelect(selectedProducts)}
          >
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        {/* <TabsList className="mb-4">
          <TabsTrigger value="recommendations">Indicação da IA</TabsTrigger>
          <TabsTrigger value="all">Todos os Produtos</TabsTrigger>
        </TabsList> */}

        <div className="w-full h-96 overflow-auto rounded-lg border p-2">
          <TabsContent value="recommendations">
            <div className="flex flex-col gap-2">
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                filteredProducts.map((product) => (
                  <AppProductListItemSelect
                    key={product.id}
                    product={product}
                    checked={selectedProducts.includes(product.id)}
                    onChange={handleCheck}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="flex flex-col gap-2">
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                products.map((product) => (
                  <AppProductListItemSelect
                    key={product.id}
                    product={product}
                    checked={selectedProducts.includes(product.id)}
                    onChange={handleCheck}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
