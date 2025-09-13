import { SUPPORT_CIRCLES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { SupportCircleChat } from "./support-circle-chat";
import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SupportCirclePage({ params }: { params: { circleId: string } }) {
  const circle = SUPPORT_CIRCLES.find((c) => c.id === params.circleId);

  if (!circle) {
    notFound();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-muted rounded-full">
            <circle.icon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{circle.title}</h1>
        </div>
        <p className="text-muted-foreground">{circle.description}</p>
      </header>
      
      <Alert variant="default" className="bg-primary/10 border-primary/20 mb-4">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle className="font-semibold">Community Guidelines</AlertTitle>
        <AlertDescription>
          This is a safe and anonymous space. Please be respectful and supportive. Harmful content will be removed by moderators.
        </AlertDescription>
      </Alert>

      <div className="flex-1 overflow-hidden">
        <SupportCircleChat />
      </div>
    </div>
  );
}
