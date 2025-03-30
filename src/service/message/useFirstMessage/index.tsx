import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";
import { ChatMessageProps } from "../useGetAllMessages";
import { queryClient } from "@/service";

export interface MessageProps {
  chat_id: string;
}

const createFirstMessage = async ({
  chat_id,
}: MessageProps): Promise<ChatMessageProps | undefined> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.post(
    "/auth/message/first_message",
    { chat_id },
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

export const useFirstMessage = () => {
  return useMutation({
    mutationFn: (data: MessageProps) => createFirstMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });
};
