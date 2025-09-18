import { SUPPORT_CIRCLES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ShieldCheck } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SupportCirclesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Support Circles</h1>
        <p className="text-muted-foreground mt-2">
          Connect with peers who understand what you're going through. These are safe, anonymous, and moderated spaces to share and listen.
        </p>
      </div>

      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle className="font-semibold">A Safe & Anonymous Space</AlertTitle>
        <AlertDescription>
          Your participation here is anonymous. You will be assigned a random username and avatar. Please be respectful and follow our community guidelines to ensure a supportive environment for everyone.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SUPPORT_CIRCLES.map((circle) => (
          <Card key={circle.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-muted rounded-full">
                  <circle.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{circle.title}</CardTitle>
              </div>
              <CardDescription>{circle.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Community-led discussions</span>
               </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/support-circles/${circle.id}`}>Join Discussion</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
