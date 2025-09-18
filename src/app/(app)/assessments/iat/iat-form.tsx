
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
import { IAT_QUESTIONS, getIatInterpretation } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Answers = { [key: number]: number };

export function IatForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<{ score: number; interpretation: { severity: string; suggestion: string } } | null>(null);

  const handleValueChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: parseInt(value, 10) }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      alert("Please select an answer.");
      return;
    }
    if (currentQuestion < IAT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < IAT_QUESTIONS.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const interpretation = getIatInterpretation(score);
    setResult({ score, interpretation });
  };

  const resetForm = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
  };
  
  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Result</CardTitle>
          <CardDescription>
            Your total score is <span className="font-bold text-primary">{result.score}</span> out of 100.
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

  const progress = ((currentQuestion + 1) / IAT_QUESTIONS.length) * 100;
  const questionItem = IAT_QUESTIONS[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
            <div key={currentQuestion} className="space-y-4 p-4 rounded-lg bg-card">
              <p className="font-medium leading-none text-lg">
                {currentQuestion + 1}. {questionItem.question}
              </p>
              <RadioGroup
                onValueChange={(value) => handleValueChange(currentQuestion, value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                value={answers[currentQuestion]?.toString()}
              >
                {questionItem.options.map((option, optionIndex) => (
                  <Label 
                    key={optionIndex}
                    htmlFor={`q${currentQuestion}-o${optionIndex}`}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${answers[currentQuestion] === optionIndex ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'}`}
                    >
                    <RadioGroupItem value={String(optionIndex)} id={`q${currentQuestion}-o${optionIndex}`} />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          <Button onClick={handleNext} className="w-full">
            {currentQuestion < IAT_QUESTIONS.length - 1 ? 'Next' : 'Calculate Score'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
