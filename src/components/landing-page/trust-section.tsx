import { ShieldCheck, Brain, HeartHandshake, IndianRupee } from "lucide-react";

const trustFactors = [
  {
    icon: IndianRupee,
    title: "Integrated with Tele-MANAS",
    description: "Access free, 24/7, confidential crisis support from the Government of India's national helpline.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description: "Your data is end-to-end encrypted. We believe your privacy is a right, not a feature.",
  },
  {
    icon: Brain,
    title: "Evidence-Based Approach",
    description: "Our tools and techniques are grounded in established psychological science like CBT and Mindfulness.",
  },
  {
    icon: HeartHandshake,
    title: "Culturally Sensitive",
    description: "Designed with a deep understanding of the unique challenges and cultural context of Indian youth.",
  },
];

export function TrustSection() {
  return (
    <section id="mission" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Your Well-being, Our Priority
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We are committed to building a platform that is safe, effective, and worthy of your trust.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trustFactors.map((factor, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 bg-primary/10 p-4 rounded-full">
                <factor.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{factor.title}</h3>
              <p className="mt-2 text-muted-foreground">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
