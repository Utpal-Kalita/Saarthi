import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Saarthi helped me manage my exam stress like never before. The chatbot is a lifesaver for late-night worries!",
    author: "Anonymous Student",
  },
  {
    quote: "Finally, a safe space to talk about what I'm going through. The peer groups are amazing and make me feel less alone.",
    author: "Anonymous Young Professional",
  },
  {
    quote: "The self-assessment tools gave me the language to understand my feelings. It was the first step toward getting help.",
    author: "Anonymous User",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Voices of Empowerment
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          See how Saarthi is making a difference in the lives of young Indians.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardContent className="pt-6">
                <blockquote className="text-foreground italic mb-4">
                  “{testimonial.quote}”
                </blockquote>
                <div className="flex items-center justify-center">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarFallback>{testimonial.author.charAt(10)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-muted-foreground">{testimonial.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
