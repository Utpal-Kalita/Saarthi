import { JournalForm } from "./journal-form";

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mood Journal</h1>
        <p className="text-muted-foreground">
          Write down your thoughts and feelings. Our AI will help you find patterns and insights.
        </p>
      </div>
      <JournalForm />
    </div>
  );
}
