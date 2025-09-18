import { IatForm } from "./iat-form";

export default function IatPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Internet Addiction Test (IAT)</h1>
        <p className="text-muted-foreground mt-2">
          This test helps assess the severity of internet addiction. Please answer all questions based on your usage patterns over the last month.
        </p>
      </div>
      <IatForm />
    </div>
  );
}
