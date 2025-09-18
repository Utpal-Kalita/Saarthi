import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, NotebookText, HeartPulse, Library, Users, ArrowRight, Lightbulb, TrendingUp, CircleUser } from "lucide-react";
import { MoodChart } from "@/components/mood-chart";


export default function Dashboard() {
  const userName = "Alex"; // This would be dynamic in a real app

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Good Morning, {userName}!</h1>
        <p className="text-muted-foreground">"The secret of getting ahead is getting started." - Mark Twain</p>
      </div>
      
      <div className="text-center md:text-left">
          <Button size="lg" asChild>
            <Link href="/journal">How are you feeling today?</Link>
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Current State Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleUser />
              My Current State
            </CardTitle>
            <CardDescription>A snapshot of your recent wellness.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Latest Mood</p>
                <p className="text-lg font-semibold">Feeling Content 😊</p>
            </div>
             <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Recent Assessment</p>
                <p className="text-lg font-semibold">PHQ-9: Mild Symptoms</p>
            </div>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/assessments">View Full Report</Link>
            </Button>
          </CardContent>
        </Card>

        {/* My Progress & Insights Card */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <TrendingUp />
                My Progress & Insights
            </CardTitle>
            <CardDescription>Visualizing your wellness journey over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
                <MoodChart />
            </div>
            <div className="mt-4 p-4 rounded-lg bg-primary/10 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                    <h4 className="font-semibold">Personalized Insight</h4>
                    <p className="text-sm text-muted-foreground">You seem to feel more energized on days you engage in breathing exercises. Keep up the great work!</p>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Actions Card */}
        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>Next steps you can take on your wellness journey.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-muted/50 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Library className="h-5 w-5 text-primary" />
                            Suggested Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Read our new guide on "Managing Exam Stress" to learn helpful coping techniques.</p>
                    </CardContent>
                    <CardFooter>
                         <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="/resources">Read Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card className="bg-muted/50 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <Users className="h-5 w-5 text-primary" />
                            Peer Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Connect with others who understand. Explore our Peer Support Circles for academic stress.</p>
                    </CardContent>
                    <CardFooter>
                         <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="/support-circles">Join a Circle <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card className="bg-muted/50 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <HeartPulse className="h-5 w-5 text-primary" />
                            Professional Help
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Considering talking to someone? Explore professional support options, like connecting with a Tele-MANAS counselor.</p>
                    </CardContent>
                    <CardFooter>
                         <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="/therapists">Find a Counselor <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
