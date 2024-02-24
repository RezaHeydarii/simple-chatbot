import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { chatWithAi } from "./fn";

export const useChatWithAi = () => {
  const result = useMutation({ mutationFn: chatWithAi });

  return result as UseMutationResult<
    {
      response: string;
    },
    Error,
    {
      message: string;
    },
    unknown
  >;
};
