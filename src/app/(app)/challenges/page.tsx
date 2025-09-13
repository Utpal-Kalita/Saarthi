import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Bike, Star } from "lucide-react";

const challenges = [
  {
    title: "7-Day Gratitude Journal Challenge",
    description: "Discover the positive impact of gratitude by jotting down three things you're thankful for each day for a week.",
    icon: Award,
    status: "Join Now",
  },
  {
    title: "Mindful Movement Week",
    description: "Connect your mind and body. Dedicate 15 minutes each day to a mindful activity like walking, stretching, or yoga.",
    icon: Bike,
    status: "Join Now",
  },
  {
    title: "Digital Detox Weekend",
    description: "Take a break from the noise. Challenge yourself to reduce screen time for a weekend to recharge and reconnect with the world offline.",
    icon: Star,
    status: "Coming Soon",
    disabled: true,
  },
];

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Community Challenges</h1>
        <p className="text-muted-foreground mt-2">
          Join optional, positive challenges to foster well-being and build healthy habits with the community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
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
              <Button className="w-full" disabled={challenge.disabled}>
                {challenge.status}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
