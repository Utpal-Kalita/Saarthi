import { Phq9Form } from "./phq9-form";

export default function Phq9Page() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">PHQ-9 Depression Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Over the last 2 weeks, how often have you been bothered by any of the following problems? Please answer all questions.
        </p>
      </div>
      <Phq9Form />
    </div>
  );
}
