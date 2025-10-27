import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Rocket, ChevronDown } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteContent } from "@shared/content";

export function EnhancedHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["UNLOCK", "UNLEASH", "ELEVATE", "MAXIMIZE"];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-lfc-red rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-bright-red rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
        </div>
      </div>

      {/* Parallax image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
          alt="Dave Cornock - All Weather Professional Football Coach"
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            isLoaded ? "scale-100" : "scale-110"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <ScrollReveal animation="fadeIn" duration={1000}>
            <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4 animate-slideInLeft">
              {siteContent.site.name.toUpperCase()}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" duration={1200} delay={200}>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
              <span className="inline-block transition-all duration-500 transform">
                {words[currentWordIndex]}
              </span>{' '}
              YOUR{' '}
              <span className="text-lfc-red inline-block animate-pulse">POTENTIAL</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" duration={1200} delay={400}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {siteContent.site.tagline.toUpperCase()}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeIn" duration={1200} delay={600}>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              {siteContent.home.hero.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" duration={1200} delay={800}>
            <blockquote className="text-2xl md:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic relative">
              <span className="absolute -top-4 -left-4 text-6xl opacity-20">"</span>
              {siteContent.coach.quote}
              <span className="absolute -bottom-8 -right-4 text-6xl opacity-20">"</span>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" duration={1200} delay={1000}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/individual-coaching">
                <AnimatedButton 
                  animation="slide"
                  className="bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4"
                >
                  {siteContent.home.hero.primaryButton}
                </AnimatedButton>
              </Link>
              <AnimatedButton
                animation="glow"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4"
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {siteContent.home.hero.secondaryButton}
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white opacity-60" />
      </div>
    </section>
  );
}