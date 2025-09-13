import { SdqForm } from "./sdq-form";

export default function SdqPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Strengths and Difficulties Questionnaire (SDQ)</h1>
        <p className="text-muted-foreground mt-2">
          For each statement, please mark the box that best describes you in the last six months. Please answer all questions.
        </p>
      </div>
      <SdqForm />
    </div>
  );
}
