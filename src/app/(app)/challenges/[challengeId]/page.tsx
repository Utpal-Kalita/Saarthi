import { CHALLENGES, CHALLENGE_DETAILS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ChallengeDetailPage({ params }: { params: { challengeId: string } }) {
  const challenge = CHALLENGES.find((c) => c.id === params.challengeId);
  const challengeDetails = CHALLENGE_DETAILS[params.challengeId];

  if (!challenge || !challengeDetails) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <div className="flex items-start md:items-center gap-3 mb-2 flex-col md:flex-row">
          <div className="p-2 bg-muted rounded-full">
            <challenge.icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">{challenge.title}</h1>
            <p className="text-muted-foreground mt-1">{challenge.description}</p>
          </div>
        </div>
      </header>
      
      <Card>
        <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Complete the daily tasks to build a new habit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {challengeDetails.days.map((day, index) => (
                <div key={day.day}>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Day {day.day}: {day.title}</h3>
                        <div className="flex items-start space-x-4 p-4 border rounded-lg bg-muted/50">
                            <Checkbox id={`day-${day.day}-task`} className="mt-1" />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor={`day-${day.day}-task`} className="font-medium">
                                    {day.task}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {day.instruction}
                                </p>
                            </div>
                        </div>
                    </div>
                    {index < challengeDetails.days.length - 1 && <Separator className="my-6" />}
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
