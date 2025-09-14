import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-xl font-semibold">
              <BrainCircuit className="h-7 w-7 text-primary" />
              <span>Saarthi</span>
            </Link>
            <p className="mt-2 text-muted-foreground">Your companion for mental well-being.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-muted-foreground">
            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-semibold text-foreground">Navigate</h3>
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#mission" className="hover:text-primary transition-colors">Our Mission</Link>
                <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
            </div>
             <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-semibold text-foreground">Legal</h3>
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Saarthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
