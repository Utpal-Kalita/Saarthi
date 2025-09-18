import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Bike, Star } from "lucide-react";
import { CHALLENGES } from "@/lib/constants";

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Community Challenges</h1>
        <p className="text-muted-foreground mt-2">
          Join optional, positive challenges to foster well-being and build healthy habits with the community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CHALLENGES.map((challenge) => (
          <Card key={challenge.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-muted rounded-full">
                  <challenge.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{challenge.title}</CardTitle>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Future content like progress can go here */}
            </CardContent>
            <CardFooter>
               {challenge.disabled ? (
                 <Button className="w-full" disabled>
                    {challenge.status}
                </Button>
               ) : (
                <Button asChild className="w-full">
                    <Link href={`/challenges/${challenge.id}`}>{challenge.status}</Link>
                </Button>
               )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
