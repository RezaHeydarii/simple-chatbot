import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const openAIApiKey = process.env.OPENAI_API_KEY;
const router = express.Router();
const outputParser = new StringOutputParser();

const chatModel = new ChatOpenAI({
  openAIApiKey,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a senior fullstack developer"],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel).pipe(outputParser);

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(422).json({ message: "message is missing" });

  chain
    .invoke({
      input: message,
    })
    .then((aiRes) => {
      return res.status(200).json({ response: aiRes });
    })
    .catch((err) => {
      return res.status(500).json({ message: "openai error", err });
    });
});

export default router;
