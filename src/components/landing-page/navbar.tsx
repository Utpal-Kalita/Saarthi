import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#mission", label: "Our Mission" },
  { href: "#testimonials", label: "Testimonials" },
];

export function Navbar({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span>Saarthi</span>
        </Link>
        <nav className="hidden md:flex gap-6 ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <Button onClick={onGetStartedClick}>
            Get Started / Login
          </Button>
        </div>
      </div>
    </header>
  );
}
