import { AppCardProduct } from "@/components/app-card-product";
import { ProductForm, ProductFormValues } from "@/components/app-product-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateProduct } from "@/service/product/useCreateProduct";
import { useGetAllProducts } from "@/service/product/useGetAllProduct";

export const Products = () => {
  const { mutate: createProduct } = useCreateProduct();
  const { data: products = [], isLoading } = useGetAllProducts();

  const handleSubmit = (formData: ProductFormValues) => {
    createProduct(formData);
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de produto</DialogTitle>
          <ProductForm onSubmit={handleSubmit} />
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirmar</Button>
        </DialogFooter>
      </DialogContent>

      <div className="bg-white p-5 rounded-2xl border w-full">
        <header className="w-full pb-5 flex items-center justify-end border-b mb-5">
          <DialogTrigger asChild>
            <button className="ml-auto bg-green-800 hover:bg-green-900 cursor-pointer text-white font-semibold py-2 px-10 rounded">
              Adicionar Produto
            </button>
          </DialogTrigger>
        </header>

        <div className="overflow-auto max-h-[75vh]">
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
              <p className="col-span-full text-center">
                Carregando produtos...
              </p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <AppCardProduct key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center">
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
