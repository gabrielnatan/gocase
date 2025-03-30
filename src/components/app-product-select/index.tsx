import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  created_at: string | Date;
  updated_at?: string | Date;
  deleted_at?: string | Date;
}

interface AppProductListItemSelectProps {
  product: Product;
  checked?: boolean;
  onChange?: (id: string, checked: boolean) => void;
}

export const AppProductListItemSelect = ({
  product,
  checked: checkedProp = false,
  onChange,
}: AppProductListItemSelectProps) => {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onChange?.(product.id, isChecked);
  };

  const imageUrl = product.images?.[0]
    ? `http://localhost:3000${product.images[0]}`
    : "/default-image.png";

  return (
    <div className="flex items-center gap-4 w-full p-4 bg-white border-b hover:bg-gray-50 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className="w-4 h-4 cursor-pointer"
      />

      <img
        src={imageUrl}
        alt={product.name}
        className="w-16 h-16 object-cover rounded border"
      />

      <div className="flex flex-col overflow-hidden">
        <strong className="text-sm text-gray-800">{product.name}</strong>
        <p className="text-xs text-gray-600 truncate max-w-xs">
          {product.description}
        </p>
      </div>
    </div>
  );
};
