import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Login() {
  return (
    <div className="bg-white w-screen h-screen flex">
      <div className="bg-white flex-1 flex items-center justify-center">
        <form className="flex flex-col gap-5 min-w-[600px] ">
          <Image
            src="/gocase-collabs.svg"
            alt="Gocase Collabs Logo"
            width={100}
            height={50}
          />
          <Input className="w-full" placeholder="Digite seu email" />
          <Input className="w-full" placeholder="Digite sua senha" />
          <Button className="w-full">Login</Button>
        </form>
      </div>
      <div className="flex-1 bg-slate-500"></div>
    </div>
  );
}
