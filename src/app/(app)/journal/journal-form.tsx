"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { getInsights } from "./actions";

export function JournalForm() {
  const [journalEntry, setJournalEntry] = useState("");
  const [insights, setInsights] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalEntry.trim()) return;

    startTransition(async () => {
      const result = await getInsights(journalEntry);
      setInsights(result.moodInsights);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Today's Entry</CardTitle>
          <CardDescription>How are you feeling right now? Let it all out.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Start writing here..."
              rows={10}
              className="text-base"
              disabled={isPending}
            />
            <Button type="submit" disabled={!journalEntry.trim() || isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Insights"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-yellow-400" />
            Your Insights
          </CardTitle>
          <CardDescription>AI-powered reflections based on your entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] bg-muted/50 rounded-md p-4">
            {isPending ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Generating insights...</p>
              </div>
            ) : insights ? (
              <p className="whitespace-pre-wrap text-sm">{insights}</p>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Your insights will appear here after you submit an entry.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
