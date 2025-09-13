"use server";

import { crisisKeywordDetection } from "@/ai/flows/crisis-keyword-detection";
import { getCBTGuidance } from "@/ai/flows/cbt-guidance-from-chatbot";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function handleChat(
  userInput: string,
  chatHistory: Message[]
) {
  try {
    const crisisCheck = await crisisKeywordDetection({ userInput });

    if (crisisCheck.isCrisis) {
      return {
        isCrisis: true,
        helplineMessage: crisisCheck.helplineMessage,
        response: null,
      };
    }

    const cbtHistory = chatHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    const guidance = await getCBTGuidance({
      message: userInput,
      chatHistory: cbtHistory,
    });
    
    return {
      isCrisis: false,
      response: guidance.response,
    };
  } catch (error) {
    console.error("Error in handleChat action:", error);
    return {
      isCrisis: false,
      response: "Sorry, something went wrong. Please try again later.",
    };
  }
}
