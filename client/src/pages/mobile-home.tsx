import { MobileHeroSection, MobileExpectationSection } from "@/components/mobile-hero-section";
import { MobileServicesSection } from "@/components/mobile-services-section";
import { MobileAboutSection } from "@/components/mobile-about-section";
import { MobileContactSection } from "@/components/mobile-contact-section";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";

export default function MobileHome() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <MobileHeroSection />

      {/* Expectations Section */}
      <MobileExpectationSection />

      {/* Services Section */}
      <MobileServicesSection />

      {/* About Section */}
      <MobileAboutSection />

      {/* Contact Section */}
      <MobileContactSection />

      {/* Floating Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}