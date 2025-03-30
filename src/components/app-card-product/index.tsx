import { Product } from "@/service/product/useGetAllProduct";
import { useState } from "react";

interface AppCardProductProps {
  product: Product;
}

export const AppCardProduct = ({ product }: AppCardProductProps) => {
  const [current, setCurrent] = useState(0);
  const images = product.images?.length
    ? product.images
    : ["/default-image.png"];

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="bg-white w-full max-w-xs rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col transition hover:shadow-lg">
      {/* Carrossel de imagens com bolinhas */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={`http://localhost:3000${images[current]}`}
          alt={`${product.name} ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  index === current
                    ? "bg-white border-white scale-110"
                    : "bg-white/50 border-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="flex-1 flex flex-col p-4 gap-2">
        <strong className="text-lg text-gray-800">{product.name}</strong>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="text-sm text-gray-500">
          Preço: R$ {product.price.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">Estoque: {product.stock}</div>
        <button className="mt-auto bg-green-800 hover:bg-green-900 cursor-pointer text-white font-semibold py-2 rounded">
          Ver mais
        </button>
      </div>
    </div>
  );
};
