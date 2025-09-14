import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Users, Stethoscope } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Tier 1: Proactive Self-Care",
    description: "Engage with our empathetic AI chatbot, take confidential self-assessments, and track your mood to build self-awareness and resilience.",
  },
  {
    icon: Users,
    title: "Tier 2: Targeted Support",
    description: "Connect anonymously in moderated peer support circles, join community challenges, and gain data-driven insights into your well-being.",
  },
  {
    icon: Stethoscope,
    title: "Tier 3: Professional Care",
    description: "Get immediate crisis support via Tele-MANAS, or connect with verified counselors for professional therapy in a secure environment.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Discover a New Path to Mental Wellness
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Saarthi offers a comprehensive, tiered approach designed to meet you where you are.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 inline-block bg-primary/10 p-3 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
