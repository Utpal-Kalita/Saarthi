"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { TrustSection } from "./trust-section";
import { CtaSection } from "./cta-section";
import { TestimonialsSection } from "./testimonials-section";
import { Footer } from "./footer";
import { AuthModal } from "./auth-modal";

export function LandingPage() {
    const [authModalOpen, setAuthModalOpen] = useState(false);

    return (
        <div className="bg-background text-foreground">
            <Navbar onGetStartedClick={() => setAuthModalOpen(true)} />
            <main>
                <HeroSection onGetStartedClick={() => setAuthModalOpen(true)} />
                <FeaturesSection />
                <TrustSection />
                <CtaSection onGetStartedClick={() => setAuthModalOpen(true)} />
                <TestimonialsSection />
            </main>
            <Footer />
            <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </div>
    );
}
