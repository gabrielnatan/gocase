import { tv } from "tailwind-variants";

interface AppChatItemProps {
  chat_id: string;
  title: string;
  message: string;
  dateTime: string;
  active: boolean;
  onSelect: (id: string) => void;
}
export const AppChatItem = ({
  chat_id,
  title,
  message,
  dateTime,
  active,
  onSelect,
}: AppChatItemProps) => {
  const handleClick = () => {
    onSelect(chat_id);
  };
  const date = new Date(dateTime);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hour}:${minutes}`;

  const style = tv({
    slots: {
      baseStyle:
        "cursor-pointer h-20 p-2 pr-6 border rounded-sm flex flex-col relative transition-all",
      titleStyle: "text-xs text-gray-700",
      userStyle: "font-extrabold text-xs text-gray-500",
      messageStyle: "text-xs text-gray-500 max-w-80 truncate",
      dateStyle: "text-xs text-gray-500 absolute right-3 bottom-1",
    },
    variants: {
      variant: {
        default: {
          baseStyle: "hover:bg-gray-50",
        },

        active: {
          baseStyle: "bg-sky-50 border-sky-200 hover:bg-sky-100",
          titleStyle: "text-sky-600",
          userStyle: "text-sky-700",
        },
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  const { baseStyle, titleStyle, userStyle, messageStyle, dateStyle } = style({
    variant: active ? "active" : "default",
  });

  return (
    <div onClick={handleClick} className={baseStyle()}>
      <span className={userStyle()}>Gocase IA</span>
      <strong className={titleStyle()}>{title}</strong>
      <p className={messageStyle()}>{message}</p>
      <span className={dateStyle()}>{time}</span>
    </div>
  );
};
