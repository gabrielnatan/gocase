import { api, getCookieValue } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

interface Chat {
  lastMessage: {
    content: string;
    created_at: string;
  };
  id: string;
  title: string;
  user_id: string;
  created_at: string;
}

interface GetAllChatsResponse {
  message: Chat[];
}

const getAllChats = async (): Promise<Chat[]> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.get<GetAllChatsResponse>(`/auth/chat/`, {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  });
  return data ? data.message : [];
};

export const useGetAllChats = () => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: getAllChats,
  });
};
