'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting crisis keywords in user input
 * and providing immediate access to the Tele-MANAS helpline.
 *
 * @module crisis-keyword-detection
 * @typicalname crisisKeywordDetection
 *
 * @exports {
 *   crisisKeywordDetection: function - The main function to detect crisis keywords and provide the helpline.
 *   CrisisKeywordDetectionInput: type - The input type for the crisisKeywordDetection function.
 *   CrisisKeywordDetectionOutput: type - The output type for the crisisKeywordDetection function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrisisKeywordDetectionInputSchema = z.object({
  userInput: z.string().describe('The user input text to analyze.'),
});
export type CrisisKeywordDetectionInput = z.infer<typeof CrisisKeywordDetectionInputSchema>;

const CrisisKeywordDetectionOutputSchema = z.object({
  isCrisis: z.boolean().describe('Whether the user input indicates a crisis situation.'),
  helplineMessage: z.string().optional().describe('A message providing the Tele-MANAS helpline number if a crisis is detected.'),
});
export type CrisisKeywordDetectionOutput = z.infer<typeof CrisisKeywordDetectionOutputSchema>;


export async function crisisKeywordDetection(input: CrisisKeywordDetectionInput): Promise<CrisisKeywordDetectionOutput> {
  return crisisKeywordDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'crisisKeywordDetectionPrompt',
  input: {schema: CrisisKeywordDetectionInputSchema},
  output: {schema: CrisisKeywordDetectionOutputSchema},
  prompt: `You are a crisis detection AI. Your task is to analyze the user input and determine if it indicates a crisis situation, such as thoughts of self-harm or suicide.

  Respond with JSON. The isCrisis field should be true if the input suggests a crisis, and false otherwise. If isCrisis is true, also populate the helplineMessage field with a message that includes India's Tele-MANAS helpline number (14416).

  User Input: {{{userInput}}}`,
});

const crisisKeywordDetectionFlow = ai.defineFlow(
  {
    name: 'crisisKeywordDetectionFlow',
    inputSchema: CrisisKeywordDetectionInputSchema,
    outputSchema: CrisisKeywordDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
