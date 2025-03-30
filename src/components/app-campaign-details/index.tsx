import { format } from "date-fns";
import { User, Tag } from "lucide-react";

interface CampaignProps {
  name: string;
  status: "active" | "completed" | "pending" | "canceled" | "archived";
  goal: string;
  products: string[]; // Agora como array, conforme modelo
  content_type: string;
  hashtags: string[];
  influencers: string[];
  dates: {
    entrega: string;
    publicacao: string;
  };
  materials: string[];
}

const CampaignDetails: React.FC<CampaignProps> = (props) => {
  return (
    <div className="w-full max-w-[800px] p-6 rounded-lg border shadow-md bg-white">
      {/* 🔹 Cabeçalho */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">{props?.name}</h1>
        <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-md capitalize">
          {props?.status === "active" ? "On Progress" : props?.status}
        </span>
      </div>

      {/* 🔹 Informações principais */}
      <div className="grid grid-cols-2 gap-6 mt-4 text-gray-700 text-sm">
        <p>
          <strong className="text-gray-900">🎯 Goal:</strong> {props?.goal}
        </p>
        <p>
          <strong className="text-gray-900">🏷 Products:</strong>{" "}
          {props?.products?.join(", ")}
        </p>
        <p>
          <strong className="text-gray-900">📢 Content Type:</strong>{" "}
          {props?.content_type}
        </p>
      </div>

      {/* 🔹 Hashtags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <strong className="text-gray-900">🏷 Hashtags:</strong>
        {props?.hashtags?.map((el, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            <Tag size={14} /> {el}
          </span>
        ))}
      </div>

      {/* 🔹 Influencers */}
      <div className="mt-4">
        <strong className="text-gray-900">👥 Influencers:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {props?.influencers?.map((el, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            >
              <User size={14} /> {el}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 Dates */}
      <div className="mt-4 flex justify-between bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
        <p>
          <strong className="text-gray-900">📅 Delivery:</strong>{" "}
          {props?.dates?.entrega &&
            format(new Date(props?.dates?.entrega), "dd/MM/yyyy")}
        </p>
        <p>
          <strong className="text-gray-900">🗓 Publish:</strong>{" "}
          {props?.dates?.publicacao &&
            format(new Date(props?.dates?.publicacao), "dd/MM/yyyy")}
        </p>
      </div>

      {/* 🔹 Materials */}
      <div className="mt-6">
        <strong className="text-gray-900">📂 Materials:</strong>
        <div className="flex flex-wrap gap-4 mt-2">
          {props?.materials?.map((el, index) => {
            {
              console.log("aqui image ", `http://localhost:3000/uploads${el}`);
            }

            return (
              <div
                key={index}
                className="relative flex items-center justify-between w-64 p-3 bg-gray-100 rounded-md shadow-md text-gray-800 cursor-pointer hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`http://localhost:3000${el}`}
                    alt={`Material ${index + 1}`}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span className="text-sm truncate max-w-[150px]">
                    Material {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
