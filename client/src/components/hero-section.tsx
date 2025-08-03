import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowRight } from "lucide-react";
import { siteContent } from "@shared/content";
import { useState } from "react";

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40" aria-hidden="true"></div>
      
      {/* Hero image */}
      <div className="absolute top-0 right-0 w-1/2 h-full" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-full loading-skeleton" />
          )}
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt=""
            className={`w-full h-full object-cover opacity-60 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-60' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="relative z-10 text-left container-custom animate-fade-in">
        <div className="max-w-3xl">
          <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4">
            {siteContent.site.name.toUpperCase()}
          </div>
          <h1 
            id="hero-title"
            className="text-6xl md:text-8xl font-black text-white leading-none mb-6"
          >
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <span key={index} className="text-lfc-red">{word}</span> : 
                word + (index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : '')
            )}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {siteContent.site.tagline.toUpperCase()}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
            {siteContent.home.hero.subtitle}
          </p>
          <blockquote className="text-2xl md:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic">
            <span className="sr-only">Quote from coach: </span>
            "{siteContent.coach.quote}"
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Call to action buttons">
            <Link href="/individual-coaching">
              <Button 
                size="xl"
                className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200 group"
                aria-label="Learn more about individual coaching sessions"
              >
                {siteContent.home.hero.primaryButton}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="xl"
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Set focus for screen readers
                  const heading = element.querySelector('h2');
                  if (heading) heading.focus();
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200"
              aria-label="Scroll to services section"
            >
              {siteContent.home.hero.secondaryButton}
            </Button>
          </div>
        </div>
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
    <section 
      id="expectations" 
      className="section-padding bg-almost-black"
      aria-labelledby="expectations-title"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            id="expectations-title"
            className="text-4xl md:text-5xl font-black text-white mb-4 focus:outline-none"
            tabIndex={-1}
          >
            <Rocket className="inline-block w-12 h-12 text-lfc-red mr-4" aria-hidden="true" />
            WHAT TO EXPECT
          </h2>
        </div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Coaching expectations"
        >
          {expectations.map((item, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              role="listitem"
            >
              <div 
                className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-bright-red transition-colors duration-200"
                aria-hidden="true"
              >
                <span className="text-2xl" role="img" aria-label={`Icon for ${item.title}`}>
                  {item.icon}
                </span>
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
          <div className="text-2xl font-bold text-lfc-red">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </div>
      </div>
    </section>
  );
}
