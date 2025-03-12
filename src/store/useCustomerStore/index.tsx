import { create } from "zustand";
import { z } from "zod";

const CustomerSchema = z.object({
  first_name: z.string().min(1, "O primeiro nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
});

type Customer = z.infer<typeof CustomerSchema>;

type CustomerStore = {
  customer: Customer;
  access_token: string;
  setCustomer: (customer: Customer) => void;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

const useCustomerStore = create<CustomerStore>((set) => ({
  customer: {
    first_name: "",
    last_name: "",
    email: "",
  },
  access_token: "",
  setCustomer: (customer) => {
    const parsedCustomer = CustomerSchema.safeParse(customer);
    if (!parsedCustomer.success) {
      console.error("Erro ao definir cliente:", parsedCustomer.error);
      return;
    }
    set({ customer: parsedCustomer.data });
  },
  setAccessToken: (token) => set({ access_token: token }),
  clearAccessToken: () => set({ access_token: "" }),
}));

export { useCustomerStore };
