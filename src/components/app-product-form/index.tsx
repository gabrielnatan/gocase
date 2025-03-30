import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  images: File[];
}

interface ProductFormProps {
  onSubmit: (product: ProductFormValues) => void;
}

const CATEGORY_OPTIONS = ["Capas de celular", "Roupas", "Mochilas"];

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [form, setForm] = useState<ProductFormValues>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    sku: "",
    images: [],
  });

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const objectUrls = form.images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [form.images]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-6 bg-white border rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Criar Novo Produto</h2>

      <div>
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Categoria</Label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="price">Preço</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            required
            min={0}
            step={0.01}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="stock">Estoque</Label>
          <Input
            type="number"
            name="stock"
            id="stock"
            value={form.stock}
            onChange={handleChange}
            required
            min={0}
            step={1}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input
          name="sku"
          id="sku"
          value={form.sku}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Imagens do Produto</Label>
        <Input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {previews.length > 0 && (
          <div className="mt-4 flex gap-3 flex-wrap">
            {previews.map((url, idx) => (
              <div key={idx} className="relative group w-20 h-20">
                <img
                  src={url}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white w-full"
      >
        Salvar Produto
      </Button>
    </form>
  );
};
