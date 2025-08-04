import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket } from "lucide-react";
import { siteContent } from "@shared/content";

export function MobileHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-black via-dark-navy to-almost-black">
      {/* Background Image - Mobile Optimized */}
      <div className="absolute inset-0 bg-black bg-opacity-60">
        <img 
          src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
          alt="Dave Cornock - All Weather Professional Football Coach"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content - Stacked Vertically for Mobile */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo/Title */}
        <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-6">
          {siteContent.site.name.toUpperCase()}
        </div>

        {/* Headline - 2-3 lines max */}
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          {siteContent.home.hero.title.split(' ').map((word, index) => 
            word === 'POTENTIAL' ? 
              <span key={index} className="text-lfc-red">{word}</span> : 
              word + (index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : '')
          )}
        </h1>

        {/* Subheading */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          {siteContent.site.tagline.toUpperCase()}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
          {siteContent.home.hero.subtitle}
        </p>

        {/* Quote */}
        <blockquote className="text-lg sm:text-xl font-bold text-lfc-red mb-8 italic">
          "{siteContent.coach.quote}"
        </blockquote>

        {/* CTA Buttons - Full Width, Thumb-Friendly */}
        <div className="space-y-4">
          <Link href="/individual-coaching" className="block">
            <Button className="w-full bg-lfc-red text-white hover:bg-bright-red font-bold text-lg py-4 px-6 transition-all duration-200 min-h-[44px]">
              {siteContent.home.hero.primaryButton}
            </Button>
          </Link>
          
          <button
            onClick={() => {
              const element = document.getElementById('services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg py-4 px-6 transition-all duration-200 rounded-md min-h-[44px]"
          >
            {siteContent.home.hero.secondaryButton}
          </button>
        </div>
      </div>
    </section>
  );
}

export function MobileExpectationSection() {
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
    <section id="expectations" className="py-12 bg-almost-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            <Rocket className="inline-block w-8 h-8 text-lfc-red mr-2" />
            WHAT TO EXPECT
          </h2>
        </div>

        {/* Expectations Grid - Single Column for Mobile */}
        <div className="space-y-8">
          {expectations.map((item, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="w-14 h-14 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-bright-red transition-colors duration-200">
                <span className="text-xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-base text-gray-200 mb-6">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-lg font-bold text-lfc-red">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </div>
      </div>
    </section>
  );
}