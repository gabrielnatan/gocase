import { v4 as uuid } from "uuid";
import { AppChatItem } from "@/components/app-chat-item";
import { AppMessageItem } from "@/components/app-message-item";
import { Textarea } from "@/components/ui/textarea";
import { useCreateChat, useGetAllChats } from "@/service/chat";
import { useCreateMessage } from "@/service/message";
import {
  ChatMessageProps,
  useGetAllMessages,
} from "@/service/message/useGetAllMessages";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Loader } from "@/components/app-loader";
import { useUploadImages } from "@/service/message/useUploadImages";

export const Campaign = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [value, setValue] = useState("");
  const [chatSelected, setChatSelected] = useState("");

  const { data } = useGetAllChats();
  const { mutate: onSelectChat } = useGetAllMessages();
  const { mutate: onSendMessage, isPending } = useCreateMessage();
  const { mutate: onStartNewChat } = useCreateChat();
  const { mutate: onUploadImage } = useUploadImages();

  const onSelect = (id: string) => {
    setChatSelected(id);
    onSelectChat(id, {
      onError: (error) => {
        console.log("ERROR ", error);
      },
      onSuccess: (data) => {
        setMessages(data);
      },
    });
  };

  const handleSendMessage = (data?: string) => {
    const message: ChatMessageProps = {
      id: uuid(),
      created_at: new Date().toString(),
      chat_id: chatSelected,
      content: data ?? value,
      sender: "user",
      type: "message",
    };
    addNewMessage(message);

    onSendMessage(message, {
      onError: (error) => {
        console.error("ERROR ", error);
      },
      onSuccess: (data: ChatMessageProps | undefined) => {
        if (data === undefined) return;
        addNewMessage(data);
      },
    });
  };

  const addNewMessage = (message: ChatMessageProps) => {
    setMessages((state) => [...state, message]);
  };

  const handleStartNewChat = () => {
    onStartNewChat(undefined, {
      onSuccess: (data) => {
        setChatSelected(data.id);
      },
    });
  };

  return (
    <div className="w-full h-full bg-white border flex rounded-sm">
      <div className="min-w-72 border-r flex flex-col">
        <div className="py-3 border-b px-2 flex justify-between items-center">
          <p className="text-sm font-bold text-gray-700">
            Chats ({data?.length})
          </p>
          <button
            onClick={handleStartNewChat}
            className="p-2 rounded-sm bg-gray-100"
          >
            <MessageSquare />
          </button>
        </div>
        <div className="p-2 flex-1 flex flex-col gap-2 ">
          {data?.map((chat, index) => {
            return (
              <Fragment key={index}>
                <AppChatItem
                  chat_id={chat.id}
                  onSelect={onSelect}
                  title={chat.title}
                  active={chat.id === chatSelected}
                  message={
                    chat?.lastMessage?.content ?? "Ainda não há mensagens..."
                  }
                  dateTime={
                    chat?.lastMessage?.created_at
                      ? chat?.lastMessage?.created_at
                      : chat?.created_at
                  }
                />
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className=" w-full  h-full   overflow-auto flex flex-col gap-3 relative">
        <div className="flex-1  flex flex-col gap-2 max-h-[85%] overflow-auto">
          <div className="flex flex-col p-5 gap-2">
            {messages.map((message) => {
              return (
                <AppMessageItem
                  {...message}
                  callback={(type: string, data: any) => {
                    if (type === "product") {
                      handleSendMessage(
                        `Ids dos produtos selecionados: ${data.join(",")}`
                      );
                    }

                    if (type === "postagem") {
                      console.log("AQUI   maneiro", data);
                      handleSendMessage(data);
                    }

                    if (type === "influencers") {
                      console.log("AQUI   maneiro", data);
                      handleSendMessage(
                        `Lista de ids dos influencers ${data.join(",")}`
                      );
                    }

                    if (type === "upload") {
                      console.log("AQUI   maneiro", data);
                      onUploadImage(data, {
                        onSuccess: (data) => {
                          console.log(data);
                          handleSendMessage(
                            `url das imagens: ${data?.join(",")}`
                          );
                        },
                      });
                    }
                  }}
                />
              );
            })}
            {isPending && (
              <AppMessageItem
                chat_id={chatSelected}
                content=""
                type="message"
                sender="assistant"
                created_at={new Date().toDateString()}
                id="loading"
              >
                <Loader />
              </AppMessageItem>
            )}
          </div>
        </div>

        <div className="w-full min-h-20 border-t bg-white  p-5 flex items-center gap-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-full resize-none"
            placeholder="No que posso te ajudar hoje?"
          />
          <button
            onClick={() => handleSendMessage()}
            className=" flex items-center justify-center p-5 border-2 border-gray-300 hover:bg-gray-100 cursor-pointer rounded-sm"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};
