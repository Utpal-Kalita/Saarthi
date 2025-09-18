import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const assessments = [
    {
        name: "PHQ-9 (Patient Health Questionnaire-9)",
        description: "A 9-question tool to screen for depression and assess its severity. It is one of the most commonly used depression screening tools.",
        href: "/assessments/phq9",
        time: "2-5 minutes"
    },
    {
        name: "Internet Addiction Test (IAT)",
        description: "A 20-question test to assess the severity of internet addiction.",
        href: "/assessments/iat",
        time: "5-10 minutes"
    },
    {
        name: "SDQ (Strengths and Difficulties Questionnaire)",
        description: "A brief behavioural screening questionnaire for children and adolescents aged 4-17.",
        href: "/assessments/sdq",
        time: "5-10 minutes",
    },
    {
        name: "BDI (Beck Depression Inventory)",
        description: "A 21-question multiple-choice self-report inventory, one of the most widely used psychometric tests for measuring the severity of depression.",
        href: "#",
        time: "5-10 minutes",
        disabled: true,
    },
    {
        name: "HAM-D (Hamilton Depression Rating Scale)",
        description: "A multiple-item questionnaire used to provide an indication of depression, and as a guide to evaluate recovery.",
        href: "#",
        time: "15-20 minutes",
        disabled: true,
    },
]

export default function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Self-Assessments</h1>
        <p className="text-muted-foreground">
          These tools can help you understand your feelings, but they are not a substitute for a professional diagnosis.
        </p>
      </div>

      <Alert variant="default" className="bg-yellow-100/50 border-yellow-300">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription>
         These assessments are for self-awareness only and are not a substitute for professional diagnosis. If you are concerned about your mental health, please speak to a professional. This disclaimer is available in English and Assamese.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
            <Card key={assessment.name} className="flex flex-col">
                <CardHeader>
                    <CardTitle>{assessment.name}</CardTitle>
                    <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Estimated time: {assessment.time}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                    {assessment.disabled ? (
                         <Button disabled className="w-full">Coming Soon</Button>
                    ) : (
                         <Button asChild className="w-full">
                            <Link href={assessment.href}>Start Assessment</Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
