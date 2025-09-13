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
import { SDQ_QUESTIONS, getSdqInterpretation } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

type Answers = { [key: number]: number };
type Scores = { [key: string]: number };
type Interpretation = { label: string; score: number; result: string; suggestion: string; };
type SdqResult = { [key: string]: Interpretation };

export function SdqForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<SdqResult | null>(null);

  const handleValueChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: parseInt(value, 10) }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      alert("Please select an answer.");
      return;
    }
    if (currentQuestion < SDQ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < SDQ_QUESTIONS.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const scores: Scores = {
      emotional: 0,
      conduct: 0,
      hyperactivity: 0,
      peer: 0,
      prosocial: 0,
      total: 0,
    };

    SDQ_QUESTIONS.forEach((q, index) => {
      let value = answers[index];
      if (q.scoreReverse) {
        if (value === 0) value = 2;
        else if (value === 2) value = 0;
      }
      scores[q.type] += value;
    });

    scores.total = scores.emotional + scores.conduct + scores.hyperactivity + scores.peer;

    const interpretation = getSdqInterpretation(scores);
    setResult(interpretation);
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
            Here is a breakdown of your results based on the Strengths and Difficulties Questionnaire.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{value.label}</h3>
                    <p className="font-bold text-primary text-xl">{value.score}</p>
                </div>
                <Separator className="my-2 bg-border/50" />
                <p className="font-semibold">{value.result}</p>
                <p className="text-muted-foreground text-sm mt-1">{value.suggestion}</p>
            </div>
          ))}
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

  const progress = ((currentQuestion + 1) / SDQ_QUESTIONS.length) * 100;
  const questionItem = SDQ_QUESTIONS[currentQuestion];
  const options = ["Not True", "Somewhat True", "Certainly True"];

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2"
                value={answers[currentQuestion]?.toString()}
              >
                {options.map((option, optionIndex) => (
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
            {currentQuestion < SDQ_QUESTIONS.length - 1 ? 'Next' : 'Calculate Score'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
