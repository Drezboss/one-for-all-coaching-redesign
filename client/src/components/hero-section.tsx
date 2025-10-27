import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ChevronDown } from "lucide-react";
import { siteContent } from "@shared/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 overflow-hidden">
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </div>

      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4 animate-fade-in">
            {siteContent.site.name.toUpperCase()}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6 animate-slide-up">
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <span key={index} className="text-lfc-red inline-block animate-pulse-subtle">{word}</span> : 
                <span key={index} className="inline-block" style={{ animationDelay: `${index * 100}ms` }}>{word} </span>
            )}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {siteContent.site.tagline.toUpperCase()}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
            {siteContent.home.hero.subtitle}
          </p>
          <blockquote className="text-2xl md:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic animate-fade-in" style={{ animationDelay: '600ms' }}>
            "{siteContent.coach.quote}"
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <Link href="/individual-coaching">
              <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200 group">
                <span>{siteContent.home.hero.primaryButton}</span>
                <Rocket className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
            <button
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200 rounded-md group"
            >
              <span>{siteContent.home.hero.secondaryButton}</span>
              <ChevronDown className="ml-2 h-5 w-5 inline-block transition-transform duration-200 group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/50" />
      </div>
    </section>
  );
}

export function ExpectationSection() {
  const expectations = [
    {
      icon: "🎯",
      title: "Personalised Training Plans",
      description: "Tailored to your strengths and goals",
    },
    {
      icon: "💪",
      title: "Technical & Physical Development",
      description: "That matches your playing style",
    },
    {
      icon: "📈",
      title: "Honest Feedback",
      description: "And consistent progression tracking",
    },
    {
      icon: "🧠",
      title: "Mental Focus",
      description: "And confidence-building woven into every session",
    },
  ];

  return (
    <section id="expectations" className="py-20 bg-almost-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <Rocket className="inline-block w-12 h-12 text-lfc-red mr-4 animate-pulse-subtle" />
            WHAT TO EXPECT
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expectations.map((item, index) => (
            <div
              key={index}
              className={cn(
                "text-center group hover:transform hover:scale-105 transition-all duration-200",
                "opacity-0 animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-bright-red transition-all duration-200 group-hover:rotate-12">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-200 mb-8">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-2xl font-bold text-lfc-red animate-pulse-subtle">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </div>
      </div>
    </section>
  );
}
