import { ChatGPTAPI, ChatMessage } from "chatgpt";

export const askGpt = async (query: string): Promise<ChatMessage> => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY ?? "",
  });

  const res = await api.sendMessage(query);
  return res;
};
