import { ChatMessageProps } from "@/service/message/useGetAllMessages";
import ReactMarkdown from "react-markdown";
import AppImageUpload from "../app-upload-image";
import CampaignDetails from "../app-campaign-details";
export const AppMessageItem = ({
  content,
  created_at,
  children,
  sender,
  type,
  props,
}: ChatMessageProps) => {
  const date = new Date(created_at);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hour}:${minutes}`;

  if (type === "briefing") {
    return <CampaignDetails {...props} />;
  }

  if (type === "upload") {
    return <AppImageUpload />;
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
