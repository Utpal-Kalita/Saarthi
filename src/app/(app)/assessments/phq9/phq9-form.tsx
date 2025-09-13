"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PHQ9_QUESTIONS, getPhq9Interpretation } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Info } from "lucide-react";

type Answers = { [key: number]: number };

export function Phq9Form() {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<{ score: number; interpretation: { severity: string; suggestion: string } } | null>(null);

  const handleValueChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: parseInt(value, 10) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < PHQ9_QUESTIONS.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const interpretation = getPhq9Interpretation(score);
    setResult({ score, interpretation });
  };

  const resetForm = () => {
    setAnswers({});
    setResult(null);
  };
  
  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Result</CardTitle>
          <CardDescription>
            Your total score is <span className="font-bold text-primary">{result.score}</span> out of 27.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-lg">{result.interpretation.severity}</h3>
            <p className="text-muted-foreground">{result.interpretation.suggestion}</p>
          </div>
           <Alert variant="default" className="bg-yellow-100/50 border-yellow-300">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
              This result is not a diagnosis. It is for informational purposes only. Please consult a qualified mental health professional for an accurate diagnosis and treatment plan.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={resetForm}>Take Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {PHQ9_QUESTIONS.map((item, index) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg bg-card">
              <p className="font-medium leading-none">
                {index + 1}. {item.question}
              </p>
              <RadioGroup
                onValueChange={(value) => handleValueChange(index, value)}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
                required
              >
                {item.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(optionIndex)} id={`q${index}-o${optionIndex}`} />
                    <Label htmlFor={`q${index}-o${optionIndex}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button type="submit" className="w-full">
            Calculate Score
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
