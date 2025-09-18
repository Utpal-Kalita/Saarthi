
'use server';
/**
 * @fileOverview An AI agent that provides CBT guidance to users, enhanced with multi-modal emotional context.
 *
 * - getMultiModalCBTGuidance - A function that handles the conversation and returns context-aware CBT-based guidance.
 * - MultiModalCBTGuidanceInput - The input type for the getMultiModalCBTGuidance function.
 * - MultiModalCBTGuidanceOutput - The return type for the getMultiModalCBTGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultiModalCBTGuidanceInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({role: z.enum(['user', 'assistant']), content: z.string()})).optional().describe('The chat history between the user and the chatbot.'),
  facialEmotion: z.string().describe("The dominant emotion detected from the user's facial expression (e.g., 'sad', 'happy', 'neutral')."),
  voiceTone: z.string().describe("The emotional tone detected from the user's voice (e.g., 'low_arousal_sad', 'neutral').")
});
export type MultiModalCBTGuidanceInput = z.infer<typeof MultiModalCBTGuidanceInputSchema>;

const MultiModalCBTGuidanceOutputSchema = z.object({
  response: z.string().describe('The chatbot response with context-aware, CBT-based guidance.'),
});
export type MultiModalCBTGuidanceOutput = z.infer<typeof MultiModalCBTGuidanceOutputSchema>;

export async function getMultiModalCBTGuidance(input: MultiModalCBTGuidanceInput): Promise<MultiModalCBTGuidanceOutput> {
  return multiModalCbtGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'multiModalCbtGuidancePrompt',
  input: {schema: MultiModalCBTGuidanceInputSchema},
  output: {schema: MultiModalCBTGuidanceOutputSchema},
  prompt: `You are a highly empathetic mental health support chatbot using Cognitive Behavioral Therapy (CBT) principles. You have access to multi-modal emotional cues.

  Your goal is to provide empathetic, contextually-aware support. Use the emotional cues to understand the user's true feelings, especially when their words and non-verbal signals might differ.

  - User's words: {{message}}
  - Detected facial emotion: {{facialEmotion}}
  - Detected voice tone: {{voiceTone}}

  INSTRUCTIONS:
  1.  Acknowledge the user's stated message first.
  2.  GENTLY and SUBTLY weave in your awareness of their non-verbal cues if they contradict the text. For example, if they say "I'm fine" but the detected emotion is "sad," you could respond, "I hear you're saying you're fine, and I'm here to listen if anything else is on your mind. Sometimes we say we're fine when we're actually feeling a bit down."
  3.  Maintain a supportive, non-judgmental, and safe tone.
  4.  Provide guidance based on CBT principles.
  5.  If any input (text, voice, or facial expression) suggests a crisis or self-harm, immediately direct them to India's Tele-MANAS helpline (14416).

  Consider the previous messages in the chat history when responding.

  Previous messages:
  {{#each chatHistory}}
  {{#if (eq this.role "user")}}User: {{this.content}}
  {{else}}Assistant: {{this.content}}{{/if}}
  {{/each}}

  User message: {{message}}

  Response: `,
});

const multiModalCbtGuidanceFlow = ai.defineFlow(
  {
    name: 'multiModalCbtGuidanceFlow',
    inputSchema: MultiModalCBTGuidanceInputSchema,
    outputSchema: MultiModalCBTGuidanceOutputSchema,
  },
  async input => {
    // In a real application, you might add more complex fusion logic here
    // before calling the prompt. For now, we pass the raw data to the LLM.
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
