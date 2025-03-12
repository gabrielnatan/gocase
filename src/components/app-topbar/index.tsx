import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { useCustomerStore } from "@/store";

export function AppTopbar() {
  const { customer } = useCustomerStore();

  const handleClickLogout = async () => {};

  return (
    <header className=" flex bg-white w-full border-b px-4 max-h-16 min-h-16 z-10">
      <div className="container w-full flex justify-end m-auto flex-1 h-16 shrink-0 items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <PopoverContent className="w-80 max-w-52 rounded-sm bg-white border p-5 -translate-x-5 translate-y-5">
              <ul className="w-full text-left">
                {customer.email}
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
