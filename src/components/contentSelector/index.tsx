import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const contentTypes = [
  "Stories",
  "Reels",
  "Feed",
  "YouTube",
  "TikTok",
  "Blog",
  "Email Marketing",
  "Shorts",
  "Podcast",
];

interface ContentTypeSelectorProps {
  onSelect: (value: string) => void;
  defaultValue?: string;
}

export const ContentTypeSelector = ({
  onSelect,
  defaultValue,
}: ContentTypeSelectorProps) => {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleConfirm = () => {
    console.log(selected);
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md w-full">
      <Label htmlFor="content-type" className="text-lg font-medium">
        📢 Perfeito! Agora, qual o tipo de conteúdo que você gostaria de usar?
      </Label>

      <select
        id="content-type"
        className="border rounded px-3 py-2 text-sm"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" disabled>
          Selecione um tipo de conteúdo
        </option>
        {contentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <Button
        type="button"
        onClick={handleConfirm}
        disabled={!selected}
        className="bg-green-700 hover:bg-green-800 text-white"
      >
        Confirmar
      </Button>
    </div>
  );
};
