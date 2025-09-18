import { JournalForm } from "./journal-form";
import { Label } from "@/components/ui/label";

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Mood Journal</h1>
        <p className="text-muted-foreground">
          Check in with yourself. Select a mood and write down your thoughts to get AI-powered insights.
        </p>
      </div>
      <JournalForm />
    </div>
  );
}
