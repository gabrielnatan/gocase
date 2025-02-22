"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Chat = {
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
};

export default function Chat() {
  const [message, setMessage] = useState<Chat[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  async function chat(prompt: string) {
    if (!prompt.trim()) return; // Evita envios vazios

    const userMessage: Chat = {
      role: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessage((prev) => [...prev, userMessage]); // Adiciona a mensagem do usuário imediatamente

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      const data: Chat[] = await response.json();

      if (Array.isArray(data)) {
        setMessage((prev) => [
          ...prev,
          ...data.map((msg) => ({
            ...msg,
            timestamp: new Date().toLocaleTimeString(),
          })),
        ]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }

    setChatMessage("");
  }

  return (
    <div className="container gap-5 max-w-7xl m-auto h-full flex-1 rounded-sm p-5 flex flex-col">
      <div className="flex flex-1 flex-col gap-5 overflow-auto max-h-[75vh] px-2">
        {message.map((c, index) => (
          <div
            key={index}
            className={`px-5 py-3 border rounded-xl max-w-4xl w-full relative ${
              c.role === "assistant" ? "bg-white" : "bg-blue-100 ml-auto"
            }`}
          >
            <span className="text-xs text-gray-500">
              {c.role === "assistant" ? "Gocase AI" : "Você"}
            </span>
            <p>{c.content}</p>
            <span className="text-xs text-gray-500 absolute right-4 bottom-2">
              {c.timestamp}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-2 rounded-lg bg-white">
        <Textarea
          placeholder="No que posso te ajudar hoje?"
          className="border-none p-3 resize-none "
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button onClick={() => chat(chatMessage)}>send</button>
      </div>
    </div>
  );
}
