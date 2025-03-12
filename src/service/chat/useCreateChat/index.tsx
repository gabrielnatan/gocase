import { queryClient } from "@/service";
import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";

interface Chat {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
}

interface ResponseChat {
  message: Chat;
}

const createChat = async () => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.post<ResponseChat>(
    "/auth/chat",
    { title: "new chat" },
    {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    }
  );
  console.log(data);
  return data.message;
};

export const useCreateChat = () => {
  return useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });
};
