'use server';
/**
 * @fileOverview Mood insights from journal entries.
 *
 * - getMoodInsightsFromJournal - A function that analyzes journal entries and provides insights into mood patterns.
 * - MoodInsightsFromJournalInput - The input type for the getMoodInsightsFromJournal function.
 * - MoodInsightsFromJournalOutput - The return type for the getMoodInsightsFromJournal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodInsightsFromJournalInputSchema = z.object({
  journalEntries: z
    .string()
    .describe('A collection of journal entries from the user.'),
});
export type MoodInsightsFromJournalInput = z.infer<typeof MoodInsightsFromJournalInputSchema>;

const MoodInsightsFromJournalOutputSchema = z.object({
  moodInsights: z
    .string()
    .describe('Insights into the users mood patterns over time.'),
});
export type MoodInsightsFromJournalOutput = z.infer<typeof MoodInsightsFromJournalOutputSchema>;

export async function getMoodInsightsFromJournal(input: MoodInsightsFromJournalInput): Promise<MoodInsightsFromJournalOutput> {
  return moodInsightsFromJournalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodInsightsFromJournalPrompt',
  input: {schema: MoodInsightsFromJournalInputSchema},
  output: {schema: MoodInsightsFromJournalOutputSchema},
  prompt: `Analyze the following journal entries and provide insights into the user's mood patterns over time.\n\nJournal Entries: {{{journalEntries}}}`,
});

const moodInsightsFromJournalFlow = ai.defineFlow(
  {
    name: 'moodInsightsFromJournalFlow',
    inputSchema: MoodInsightsFromJournalInputSchema,
    outputSchema: MoodInsightsFromJournalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
