
"use server";

import { crisisKeywordDetection } from "@/ai/flows/crisis-keyword-detection";
import { getCBTGuidance } from "@/ai/flows/cbt-guidance-from-chatbot";
import { getMultiModalCBTGuidance } from "@/ai/flows/multimodal-cbt-guidance";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// This is the original text-only chat handler
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

// This is the new handler for multi-modal chat
export async function handleMultiModalChat(
  userInput: string,
  chatHistory: Message[],
  facialEmotion: string, // Placeholder for emotion data
  voiceTone: string // Placeholder for voice tone data
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

    const guidance = await getMultiModalCBTGuidance({
      message: userInput,
      chatHistory: cbtHistory,
      facialEmotion,
      voiceTone
    });
    
    return {
      isCrisis: false,
      response: guidance.response,
    };
  } catch (error) {
    console.error("Error in handleMultiModalChat action:", error);
    return {
      isCrisis: false,
      response: "Sorry, something went wrong. Please try again later.",
    };
  }
}
