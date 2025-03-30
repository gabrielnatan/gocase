import { Box, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/go-case-logo.svg";

export function AppSidebar() {
  const items = [
    {
      title: "Criar campanha",
      url: "/",
      icon: <Inbox />,
    },
    {
      title: "Produtos",
      url: "/products",
      icon: <Box />,
    },
  ];

  return (
    <div className="w-full h-screen border-r bg-white flex flex-col">
      <header className="p-2 h-[64px] border-b flex items-center justify-center">
        <img src={Logo} alt="logo" />
      </header>
      <ol className="flex p-2 flex-1 flex-col">
        {items.map((el) => {
          return (
            <Link to={el.url}>
              <li className="p-2">{el.title}</li>
            </Link>
          );
        })}
      </ol>
    </div>
  );
}
