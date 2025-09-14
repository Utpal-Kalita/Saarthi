import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  return (
    <section id="home" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
            Saarthi: Your Guide to Well-being. Find Your Inner Calm.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            Empathetic support and professional guidance for young adults and students. Your mental wellness journey, simplified.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Button size="lg" onClick={onGetStartedClick}>
              Start Your Journey Today
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-96">
           <Image
            src="https://storage.googleapis.com/aai-web-samples/saarthi-hero.svg"
            alt="An abstract visual representing support and growth"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
