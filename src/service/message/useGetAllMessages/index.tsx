import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";

export interface ChatMessageProps {
  id: string;
  chat_id: string;
  content: string;
  props?: any;
  type:
    | "message"
    | "briefing"
    | "upload"
    | "product"
    | "postagem"
    | "influencers";
  children?: ReactNode;
  sender: string;
  created_at: string;
  callback?: (type: string, data: any) => void;
}

interface ResponseChatMessageProps {
  message: ChatMessageProps[];
}

const getAllMessage = async (chat_id: string): Promise<ChatMessageProps[]> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.get<ResponseChatMessageProps>(
    `/auth/message/message-by-chat-id/${chat_id}`,
    {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    }
  );
  return data ? data.message : [];
};

export const useGetAllMessages = () => {
  return useMutation({
    mutationFn: (data: string) => getAllMessage(data),
  });
};
