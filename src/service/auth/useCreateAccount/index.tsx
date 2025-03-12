import { api } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";

interface LoginProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const createAccount = async ({
  email,
  password,
  first_name,
  last_name,
}: LoginProps) => {
  await api.post("/create-account", {
    email,
    password,
    first_name,
    last_name,
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data: LoginProps) => createAccount(data),
  });
};
