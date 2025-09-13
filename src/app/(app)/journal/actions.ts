"use server";

import { getMoodInsightsFromJournal } from "@/ai/flows/mood-insights-from-journal";

export async function getInsights(journalEntry: string) {
  try {
    const insights = await getMoodInsightsFromJournal({
      journalEntries: journalEntry,
    });
    return insights;
  } catch (error) {
    console.error("Error getting insights:", error);
    return { moodInsights: "Sorry, I was unable to generate insights for this entry. Please try again." };
  }
}
