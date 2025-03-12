import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";
import { ChatMessageProps } from "../useGetAllMessages";
import { queryClient } from "@/service";

export interface MessageProps {
  chat_id: string;
  sender: string;
  content: string;
}

const createMessage = async ({
  chat_id,
  content,
  sender,
}: MessageProps): Promise<ChatMessageProps | undefined> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.post(
    "/auth/message/chat",
    { chat_id, content, sender },
    {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    }
  );

  if (!data?.message?.botMessage) return;
  const {
    id,
    type,
    chat_id: response_chat_id,
    sender: response_sender,
    content: response_content,
    created_at,
  } = data.message.botMessage;

  return {
    id,
    type: type,
    chat_id: response_chat_id,
    sender: response_sender,
    content: response_content,
    created_at,
  };
};

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (data: MessageProps) => createMessage(data),
    onSuccess: () => {
      // Invalidar o cache da query de 'chat' para garantir que os dados mais recentes sejam recuperados
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });
};
