import { format } from "date-fns";
import { Download, User, Tag } from "lucide-react";

// Definição das tipagens para os props do componente
interface CampaignProps {
  nome: string;
  status: "active" | "completed" | "pending" | "canceled" | "archived";
  objetivo: string;
  produto: string;
  tipoConteudo: string;
  hashtags: string[];
  influenciadores: string[];
  prazos: {
    entrega: string;
    publicacao: string;
  };
  materiais: string[];
}

const CampaignDetails: React.FC<CampaignProps> = (props) => {
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-[800px] p-6 rounded-lg border shadow-md bg-white">
      {/* 🔹 Cabeçalho */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">{props.nome}</h1>
        <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
          {props.status === "active" ? "On Progress" : props.status}
        </span>
      </div>

      {/* 🔹 Informações principais */}
      <div className="grid grid-cols-2 gap-6 mt-4 text-gray-700 text-sm">
        <p>
          <strong className="text-gray-900">🎯 Objetivo:</strong>{" "}
          {props.objetivo}
        </p>
        <p>
          <strong className="text-gray-900">🏷 Produto:</strong> {props.produto}
        </p>
        <p>
          <strong className="text-gray-900">📢 Tipo de Conteúdo:</strong>{" "}
          {props.tipoConteudo}
        </p>
      </div>

      {/* 🔹 Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <strong className="text-gray-900">🏷 Tags:</strong>
        {props.hashtags.map((el, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            <Tag size={14} /> {el}
          </span>
        ))}
      </div>

      {/* 🔹 Influenciadores */}
      <div className="mt-4">
        <strong className="text-gray-900">👥 Influenciadores:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {props.influenciadores.map((el, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            >
              <User size={14} /> {el}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 Datas */}
      <div className="mt-4 flex justify-between bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
        <p>
          <strong className="text-gray-900">📅 Entrega:</strong>{" "}
          {format(new Date(props.prazos.entrega), "dd/MM/yyyy")}
        </p>
        <p>
          <strong className="text-gray-900">🗓 Publicação:</strong>{" "}
          {format(new Date(props.prazos.publicacao), "dd/MM/yyyy")}
        </p>
      </div>

      {/* 🔹 Materiais anexados */}
      <div className="mt-6">
        <strong className="text-gray-900">📂 Anexos:</strong>
        <div className="flex flex-wrap gap-4 mt-2">
          {props.materiais.map((el, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between w-64 p-3 bg-gray-100 rounded-md shadow-md text-gray-800 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => handleDownload(el, `Material_${index + 1}.jpg`)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={el}
                  alt={`Material ${index + 1}`}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-sm truncate max-w-[150px]">
                  Material {index + 1}
                </span>
              </div>
              <Download
                size={16}
                className="text-blue-600 hover:text-blue-800"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
