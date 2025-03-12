import { api } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";

interface LoginProps {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginProps) => {
  const { data } = await api.post("/login", {
    email,
    password,
  });

  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginProps) => login(data),
  });
};
