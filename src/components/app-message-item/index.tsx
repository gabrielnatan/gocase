import { ChatMessageProps } from "@/service/message/useGetAllMessages";
import ReactMarkdown from "react-markdown";
import CampaignDetails from "../app-campaign-details";
import { ProductSelector } from "../app-select-product";
import { ContentTypeSelector } from "../contentSelector";
import { InfluencerSelector } from "../app-Influencer-selector";
import MultipleImageUpload from "../app-upload-image";
export const AppMessageItem = ({
  content,
  created_at,
  children,
  sender,
  type,
  props,
  callback,
}: ChatMessageProps) => {
  const date = new Date(created_at);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hour}:${minutes}`;

  if (type === "briefing") {
    return <CampaignDetails {...props} />;
  }

  if (type === "upload") {
    return (
      <MultipleImageUpload
        onSelect={(data: any) => {
          if (callback) callback("upload", data);
        }}
      />
    );
  }

  if (type === "product") {
    return (
      <ProductSelector
        onSelect={(data: string[]) => {
          if (callback) callback("product", data);
        }}
      />
    );
  }

  if (type === "influencers") {
    return (
      <InfluencerSelector
        onSelect={(data: string[]) => {
          if (callback) callback("influencers", data);
        }}
      />
    );
  }

  if (type === "postagem") {
    return (
      <ContentTypeSelector
        onSelect={(data) => {
          console.log("AQUI MANEIRO ", data);
          if (callback) callback("postagem", data);
        }}
      />
    );
  }

  return (
    <>
      {sender !== "user" ? (
        <div className="w-max min-w-[350px] max-w-[800px] p-3 pr-20 rounded-sm border relative bg-white">
          <span className="font-extrabold text-xs text-gray-500">
            Go Case IA
          </span>
          {children ? children : <ReactMarkdown>{content}</ReactMarkdown>}
          <span className="text-xs text-gray-500 absolute right-3 bottom-1">
            {time}
          </span>
        </div>
      ) : (
        <div className="ml-auto min-w-[350px] w-max max-w-[800px] p-3 pr-20 rounded-sm border relative border-sky-200 bg-sky-50">
          <span className="font-extrabold text-xs text-gray-500">Você</span>
          <ReactMarkdown>{content}</ReactMarkdown>
          <span className="text-xs text-gray-500 absolute right-3 bottom-1">
            {time}
          </span>
        </div>
      )}
    </>
  );
};
