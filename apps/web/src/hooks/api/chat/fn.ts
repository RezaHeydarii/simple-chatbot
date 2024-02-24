import axios from "axios";

export const CHAT_API_PATH = "/chat";

export const chatWithAi = ({ message }: { message: string }) => {
  return axios
    .post<{ response: string }>(CHAT_API_PATH, { message })
    .then((res) => res.data);
};
