interface Influencer {
  id: string;
  name: string;
  handle: string;
  category: string;
}

interface Props {
  influencer: Influencer;
  checked?: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const AppInfluencerListItemSelect = ({
  influencer,
  checked = false,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center gap-4 w-full p-4 bg-white border-b hover:bg-gray-50 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(influencer.id, e.target.checked)}
        className="w-4 h-4 cursor-pointer"
      />

      <div className="flex flex-col">
        <strong className="text-sm text-gray-800">{influencer.name}</strong>
        <span className="text-xs text-gray-500">{influencer.handle}</span>
      </div>
    </div>
  );
};
