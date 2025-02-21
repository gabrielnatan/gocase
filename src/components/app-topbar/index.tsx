import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AppTopbar() {
  return (
    <header className="flex justify-end flex-1 h-16 shrink-0 items-center gap-2 border-b px-4 max-h-16">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
