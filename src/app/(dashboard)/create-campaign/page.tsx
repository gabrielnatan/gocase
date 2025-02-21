import { Textarea } from "@/components/ui/textarea";

export default function Chat() {
  return (
    <div className="container gap-5 max-w-7xl m-auto h-full flex-1 rounded-sm p-5 flex flex-col">
      <div className="flex flex-1 flex-col gap-5 overflow-auto max-h-[75vh] px-2">
        <div className="px-5 py-3 border rounded-xl max-w-4xl bg-white w-full relative">
          <span className="text-xs text-gray-500">Gocase AI</span>
          <p>No que eu posso ajudar você?</p>
          <span className="text-xs text-gray-500 absolute right-4 bottom-2">
            10:40
          </span>
        </div>
        <div className="px-5 py-3 border rounded-xl max-w-4xl bg-white ml-auto w-full relative">
          <span className="text-xs text-gray-500">Você</span>
          <p>Um teste aqui</p>
          <span className="text-xs text-gray-500 absolute right-4 bottom-2">
            10:40
          </span>
        </div>
        <div className="px-5 py-3 border rounded-xl max-w-4xl bg-white w-full relative">
          <span className="text-xs text-gray-500">Fernanda Reis (Suporte)</span>
          <p>Olá eu sou a Fernanda, no que posso te ajudar?</p>
          <span className="text-xs text-gray-500 absolute right-4 bottom-2">
            10:40
          </span>
        </div>
      </div>

      <div className="mx-2 rounded-lg bg-white">
        <Textarea
          placeholder="No que posso te ajudar hoje?"
          className="border-none p-3 resize-none "
        />
      </div>
    </div>
  );
}
