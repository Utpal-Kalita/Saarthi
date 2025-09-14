"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Loader2, Smile, Meh, Frown, Laugh, Angry } from "lucide-react";
import { getInsights } from "./actions";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const moods = [
  { name: "Happy", icon: Laugh, color: "text-green-500" },
  { name: "Content", icon: Smile, color: "text-yellow-500" },
  { name: "Neutral", icon: Meh, color: "text-blue-500" },
  { name: "Sad", icon: Frown, color: "text-gray-500" },
  { name: "Stressed", icon: Angry, color: "text-red-500" },
];

export function JournalForm() {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [insights, setInsights] =useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalEntry.trim() || !selectedMood) {
      // Future: Add toast notification to select a mood
      return;
    }

    startTransition(async () => {
      const result = await getInsights(journalEntry);
      setInsights(result.moodInsights);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Today's Check-in</CardTitle>
          <CardDescription>First, select your current mood, then feel free to write about what's on your mind.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="font-medium mb-3 block">How are you feeling?</Label>
              <ToggleGroup 
                type="single" 
                value={selectedMood || ""}
                onValueChange={(value) => setSelectedMood(value)}
                className="grid grid-cols-5 gap-2"
                aria-label="Mood selection"
                disabled={isPending}
              >
                {moods.map((mood) => (
                  <ToggleGroupItem 
                    key={mood.name} 
                    value={mood.name} 
                    aria-label={mood.name}
                    className="flex flex-col h-auto gap-2 p-3 rounded-lg border data-[state=on]:bg-primary/10 data-[state=on]:border-primary"
                  >
                    <mood.icon className={cn("h-8 w-8", mood.color)} />
                    <span className="text-xs text-muted-foreground">{mood.name}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Start writing here..."
              rows={8}
              className="text-base"
              disabled={isPending}
            />
            <Button type="submit" disabled={!journalEntry.trim() || !selectedMood || isPending} className="w-full">
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
