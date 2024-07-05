import { OPENAI_KEY } from "$env/static/private";

import { OpenAIChat } from "langchain/llms/openai";
import { CallbackManager } from "langchain/callbacks";
import { ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, AIChatMessage, SystemChatMessage } from "langchain/schema";

import { error } from '@sveltejs/kit';

export type MessageBody = { chats: { role: "user" | "assistant", content: string }[] }

export const POST = async ({ request }) => {
    const body: MessageBody = await request.json();

    if (!body) throw error(400, 'Missing Data');

    // Create a new readable stream of the chat response
    const readableStream = new ReadableStream({
        async start(controller) {
            const chat = new ChatOpenAI({
                openAIApiKey: OPENAI_KEY,
                modelName: "gpt-3.5-turbo",
                streaming: true,
                callbackManager: CallbackManager.fromHandlers({
                    handleLLMNewToken: async (token: string) => controller.enqueue(token),
                }),
            });

            await chat.call([
                new SystemChatMessage(`Act as a user research designer, 
                take the following user data and generate a persona similar, 
                extrapolate persona facts about this type of user, be as specific as possible.
                Return response in the following format: 
                NOTHING ELSE, only in the format between the ---.
                Example: 
                ---
                
                ---
                `),
                new AIChatMessage("Hello! How can I help you today?"),
                ...body.chats.map(chat => chat.role == "user"
                    ? new HumanChatMessage(chat.content)
                    : new AIChatMessage(chat.content)
                )
            ]);

            controller.close();
        },
    });

    // Create and return a response of the readable stream
    return new Response(readableStream, {
        headers: { 'Content-Type': 'text/plain' },
    });
}



