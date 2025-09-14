import { Button } from "@/components/ui/button";

export function CtaSection({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-card to-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Ready to Find Your Saarthi?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
          Take the first step towards a healthier, happier you. It's free to start.
        </p>
        <div className="mt-8">
          <Button size="lg" onClick={onGetStartedClick}>
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
