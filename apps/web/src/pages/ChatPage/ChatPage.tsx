import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEventHandler, useState } from "react";
import cls from "classnames";
import { useChatWithAi } from "../../hooks";
import Skeleton from "@mui/material/Skeleton";

interface ChatType {
  role: "AI" | "HUMAN";
  message: string;
}

const ChatPage = () => {
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const { mutate: chatWithAi, isPending } = useChatWithAi();
  const onSubmitMessage: FormEventHandler = (e) => {
    e.preventDefault();
    if (!messageText) return;
    setChatList((list) => [...list, { role: "HUMAN", message: messageText }]);
    setMessageText("");
    chatWithAi(
      { message: messageText },
      {
        onSuccess: (res) => {
          setChatList((prev) => [
            ...prev,
            { role: "AI", message: res.response },
          ]);
        },
        onError: () => {
          setChatList((prev) => [
            ...prev,
            { role: "AI", message: "Hello how can i help you?" },
          ]);
        },
      }
    );
  };
  return (
    <main className="mt-5 mx-auto max-w-[500px] px-2.5">
      <form
        onSubmit={onSubmitMessage}
        className="mb-5 flex items-center space-x-1"
      >
        <TextField
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          label="Enter your message"
          fullWidth
          multiline
          rows={3}
        />
        <Button disabled={isPending} type="submit" variant="contained">
          Send
        </Button>
      </form>
      <section>
        {chatList.map((chat, index) => {
          return (
            <article
              key={index}
              className={cls("flex space-x-2 mb-2.5", {
                ["flex-row-reverse space-x-reverse"]: chat.role === "AI",
              })}
            >
              <Avatar className="w-10 h-10" />
              <Card className="w-full">
                <CardContent>
                  {chat.message.split("\n").map((p, i) => (
                    <Typography key={i} variant="body1">
                      {p}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </article>
          );
        })}
        {isPending && (
          <div className="flex space-x-2">
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="circular" width={"40px"} height={"40px"} />
          </div>
        )}
      </section>
    </main>
  );
};

export default ChatPage;
