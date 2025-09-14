import Image from "next/image";
import Link from "next/link";
import { THERAPISTS } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Languages, ArrowRight } from "lucide-react";

export default function TherapistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Find a Therapist</h1>
        <p className="text-muted-foreground mt-2">
          Connect with licensed and verified professionals who can support you on your mental wellness journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {THERAPISTS.map((therapist) => {
          const image = PlaceHolderImages.find(img => img.id === therapist.imageId);
          return (
            <Card key={therapist.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {image && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={image.imageUrl}
                        alt={`Profile of ${therapist.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-xl">{therapist.name}</CardTitle>
                    <CardDescription>{therapist.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                 <div>
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-2"><Stethoscope className="h-4 w-4" /> Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                        {therapist.specialties.map((spec) => (
                            <Badge key={spec} variant="secondary" className="font-normal">{spec}</Badge>
                        ))}
                    </div>
                 </div>
                 <div>
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-2"><Languages className="h-4 w-4" /> Languages</h3>
                     <div className="flex flex-wrap gap-2">
                        {therapist.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="font-normal">{lang}</Badge>
                        ))}
                    </div>
                 </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/therapists/${therapist.id}`}>
                    View Profile & Book <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
