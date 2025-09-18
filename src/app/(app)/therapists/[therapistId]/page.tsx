import { THERAPISTS } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Languages, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function TherapistProfilePage({ params }: { params: { therapistId: string } }) {
  const therapist = THERAPISTS.find((t) => t.id === params.therapistId);
  
  if (!therapist) {
    notFound();
  }
  
  const image = PlaceHolderImages.find(img => img.id === therapist.imageId);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {image && (
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shrink-0">
            <Image
              src={image.imageUrl}
              alt={`Profile of ${therapist.name}`}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <div className="pt-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">{therapist.name}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">{therapist.title}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {therapist.name.split(' ')[1]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground whitespace-pre-wrap">{therapist.bio}</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5" /> Specialties</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {therapist.specialties.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-base font-medium px-3 py-1">{spec}</Badge>
              ))}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Languages className="h-5 w-5" /> Languages</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
               {therapist.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-base font-medium px-3 py-1">{lang}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div className="space-y-6">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Book a Session</CardTitle>
                    <CardDescription>Find a time that works for you.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Scheduling feature is coming soon.</p>
                    <Button disabled className="w-full">
                        View Availability
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
