'use server';
/**
 * @fileOverview An AI agent that provides CBT guidance to users through conversation.
 *
 * - getCBTGuidance - A function that handles the conversation with the chatbot and returns CBT-based guidance.
 * - CBTGuidanceInput - The input type for the getCBTGuidance function.
 * - CBTGuidanceOutput - The return type for the getCBTGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CBTGuidanceInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({role: z.enum(['user', 'assistant']), content: z.string()})).optional().describe('The chat history between the user and the chatbot.'),
});
export type CBTGuidanceInput = z.infer<typeof CBTGuidanceInputSchema>;

const CBTGuidanceOutputSchema = z.object({
  response: z.string().describe('The chatbot response with CBT-based guidance.'),
});
export type CBTGuidanceOutput = z.infer<typeof CBTGuidanceOutputSchema>;

export async function getCBTGuidance(input: CBTGuidanceInput): Promise<CBTGuidanceOutput> {
  return cbtGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cbtGuidancePrompt',
  input: {schema: CBTGuidanceInputSchema},
  output: {schema: CBTGuidanceOutputSchema},
  prompt: `You are a mental health support chatbot that provides guidance based on Cognitive Behavioral Therapy (CBT) principles.

  Your goal is to help the user learn coping strategies for managing their mental health.

  Maintain an empathetic and supportive tone.

  If the user expresses feelings of crisis or mentions self-harm, immediately direct them to India\'s Tele-MANAS helpline (14416).

  Consider the previous messages in the chat history when responding to the user.

  Previous messages:
  {{#each chatHistory}}
  {{#if (eq this.role \"user\")}}User: {{this.content}}
  {{else}}Assistant: {{this.content}}{{/if}}
  {{/each}}

  User message: {{message}}

  Response: `,
});

const cbtGuidanceFlow = ai.defineFlow(
  {
    name: 'cbtGuidanceFlow',
    inputSchema: CBTGuidanceInputSchema,
    outputSchema: CBTGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
