import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, School, Shield, Stethoscope } from "lucide-react";

const supportOptions = [
  {
    title: "Connect with a free TELE-MANAS Counsellor",
    description: "Get immediate, free, and confidential support from the Government of India's national mental health helpline. Available 24/7.",
    icon: Phone,
    cta: "Call 14416 Now",
    href: "tel:14416",
    isExternal: true,
  },
  {
    title: "Connect Anonymously with College Counsellor",
    description: "Speak with your own college's designated counselors confidentially and anonymously. This service requires partnership with your institution.",
    icon: Shield,
    cta: "Connect Anonymously",
    href: "#",
    disabled: true,
    status: "Coming Soon",
  },
  {
    title: "Connect with Paid Counsellors",
    description: "Browse our network of verified, licensed therapists for one-on-one video sessions. Find the right professional for your specific needs.",
    icon: Stethoscope,
    cta: "Browse Therapists",
    href: "/therapists/browse",
  },
];


export default function TherapistsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Find Support</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          You are not alone. Choose the pathway to support that feels right for you. Whether you need immediate help, anonymous guidance, or specialized therapy, we're here to connect you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {supportOptions.map((option) => (
          <Card key={option.title} className="flex flex-col border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="flex-row items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <option.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="pt-2">{option.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardContent>
              {option.disabled ? (
                <div className="text-center">
                  <Button disabled className="w-full">{option.cta}</Button>
                  <p className="text-xs text-muted-foreground mt-2">{option.status}</p>
                </div>
              ) : (
                 <Button asChild className="w-full">
                  <Link href={option.href} target={option.isExternal ? '_blank' : '_self'} rel={option.isExternal ? 'noopener noreferrer' : ''}>
                    {option.cta}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
