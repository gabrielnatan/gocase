import { EllipsisVertical } from "lucide-react";

interface AppCardProps {
  value: number;
  title: string;
}

export const AppCard = ({ title, value }: AppCardProps) => {
  return (
    <div className="w-full border bg-white h-36 rounded-sm p-2 flex flex-col justify-center">
      <div className="w-full flex items-center justify-between">
        <p className="text-xs text-gray-700">{title}</p>
        <button>
          <EllipsisVertical className="colo-gray-300" />
        </button>
      </div>
      <strong className="text-center flex-1 flex justify-center items-center text-6xl text-gray-700">
        {value}
      </strong>
    </div>
  );
};
