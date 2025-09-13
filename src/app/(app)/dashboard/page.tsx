import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BotMessageSquare, NotebookText, HeartPulse, Library } from "lucide-react";

const features = [
  {
    title: "AI Assistant",
    description: "Talk through your feelings with an empathetic AI companion.",
    href: "/chat",
    icon: BotMessageSquare,
    color: "text-primary",
  },
  {
    title: "Mood Journal",
    description: "Track your mood and gain insights into your emotional patterns.",
    href: "/journal",
    icon: NotebookText,
    color: "text-green-500",
  },
  {
    title: "Self-Assessments",
    description: "Take clinically validated quizzes to understand your well-being.",
    href: "/assessments",
    icon: HeartPulse,
    color: "text-red-500",
  },
  {
    title: "Resources",
    description: "Explore articles and guides for self-care and mental health.",
    href: "/resources",
    icon: Library,
    color: "text-purple-500",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Saarthi</h1>
        <p className="text-muted-foreground">Your personal space for mental well-being. What would you like to do today?</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 bg-card hover:border-primary/50">
              <CardHeader>
                 <feature.icon className={`h-8 w-8 mb-2 ${feature.color}`} />
                <CardTitle className="text-lg font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
