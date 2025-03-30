import { useState } from "react";
import { X, Maximize } from "lucide-react";
import { Button } from "../ui/button";

const MAX_VISIBLE_IMAGES = 4;

const MultipleImageUpload = ({
  onSelect,
}: {
  onSelect: (files: File[]) => void;
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [_isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 10 - imageFiles.length);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

      setImageFiles((prev) => [...prev, ...fileArray]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onSelect(imageFiles);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="w-full h-12 border-2 border-dashed border-blue-400 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 rounded-md p-2 flex items-center justify-center cursor-pointer text-sm mb-4"
      >
        📷 Selecione imagens
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="flex flex-wrap gap-2">
        {imagePreviews.slice(0, MAX_VISIBLE_IMAGES).map((image, index) => (
          <div
            key={index}
            className="relative w-20 h-20 group rounded-md overflow-hidden border"
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
              <button
                onClick={() => setSelectedImage(image)}
                className="bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
              >
                <Maximize size={16} />
              </button>
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 p-1 rounded-full shadow-md hover:bg-red-600 text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        {imagePreviews.length > MAX_VISIBLE_IMAGES && (
          <div
            className="relative w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md text-sm font-semibold cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          >
            +{imagePreviews.length - MAX_VISIBLE_IMAGES}
          </div>
        )}
      </div>

      {imageFiles.length > 0 && (
        <Button
          className="mt-4 bg-green-700 hover:bg-green-800 text-white"
          onClick={handleConfirm}
        >
          Confirmar imagens
        </Button>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
          <div className="relative p-4 bg-white rounded-md shadow-lg max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-[80vh] rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;
