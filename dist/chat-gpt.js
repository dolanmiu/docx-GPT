import { Configuration, OpenAIApi, } from "openai";
import { getTrainingData } from "./get-training-data.js";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const trainingData = await getTrainingData();
export const askGpt = async (query) => {
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "I will show you usage code of 'docx', the TypeScript NPM library",
            },
            ...trainingData.slice(0, 2).map((data) => ({
                role: "user",
                content: data,
            })),
            {
                role: "system",
                content: "You are a helpful assistant who helps writing code and only answers questions about 'docx'",
            },
            { role: "user", content: query },
        ],
    });
    return chat_completion.data.choices[0].message?.content;
};
