import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/service/auth";
import { useCustomerStore } from "@/store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useCustomerStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: onLogin } = useLogin();

  function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    onLogin(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setAccessToken(data.access_token);
          navigate("/");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="w-full"
                  placeholder="Digite seu Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="w-full"
                  placeholder="Digite seu senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Login
        </Button>
        <Link to="/auth/create-account">Go to create account</Link>
      </form>
    </Form>
  );
};
