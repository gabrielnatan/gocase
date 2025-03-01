"use client";
import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { api } from "@/service";
import { redirect } from "next/navigation";
import { useUser } from "@/context/user.context";

export function AppTopbar() {
  const { user } = useUser();

  const handleClickLogout = async () => {
    try {
      await api({
        url: "logout",
        options: {
          method: "GET",
        },
      });
      setTimeout(() => {
        redirect("/login");
      }, 200);
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
    }
  };

  return (
    <header className=" flex bg-white   border-b px-4 max-h-16 min-h-16 z-10">
      <div className="container w-full flex justify-end m-auto flex-1 h-16 shrink-0 items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <PopoverContent className="w-80 max-w-52 rounded-sm bg-white border p-5 -translate-x-5 translate-y-5">
              <ul className="w-full text-left">
                {user.email}
                <li className="w-full" onClick={handleClickLogout}>
                  logout
                </li>
              </ul>
            </PopoverContent>
          </PopoverTrigger>
        </Popover>
      </div>
    </header>
  );
}
