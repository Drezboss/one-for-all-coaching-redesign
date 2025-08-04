import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, ArrowRight, Star } from "lucide-react";
import { siteContent } from "@shared/content";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        {/* Improved image positioning and overlay */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full">
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
              alt="Dave Cornock - All Weather Professional Football Coach"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/80 lg:to-black/90"></div>
          </div>
        </div>
      </div>

      {/* Content with improved spacing and layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left max-w-4xl animate-fade-in">
            {/* Enhanced brand badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Star className="w-4 h-4 text-lfc-red" />
              {siteContent.site.name.toUpperCase()}
              <Star className="w-4 h-4 text-lfc-red" />
            </div>

            {/* Improved hero title with better typography */}
            <h1 className="text-hero text-white leading-none mb-6 animate-slide-up">
              {siteContent.home.hero.title.split(' ').map((word, index) => 
                word === 'POTENTIAL' ? 
                  <span key={index} className="text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent animate-pulse">
                    {word}
                  </span> : 
                  <span key={index}>{word}{index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : ''}</span>
              )}
            </h1>

            {/* Enhanced subtitle */}
            <h2 className="text-display text-white/90 mb-6 font-bold animate-slide-up">
              {siteContent.site.tagline}
            </h2>

            {/* Improved description with better spacing */}
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-slide-up">
              {siteContent.home.hero.subtitle}
            </p>

            {/* Enhanced quote with better styling */}
            <blockquote className="relative mb-10 max-w-2xl animate-scale-in">
              <div className="absolute -top-2 -left-2 text-4xl text-lfc-red/20">"</div>
              <p className="text-xl lg:text-2xl font-bold text-lfc-red italic pl-6 pr-8 py-4 border-l-4 border-lfc-red bg-black/20 rounded-r-lg backdrop-blur-sm">
                {siteContent.coach.quote}
              </p>
              <div className="absolute -bottom-2 -right-2 text-4xl text-lfc-red/20 rotate-180">"</div>
            </blockquote>

            {/* Enhanced CTA buttons with better spacing and effects */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 animate-slide-up">
              <Link href="/individual-coaching">
                <Button className="btn-primary group bg-lfc-red hover:bg-lfc-red/90 text-white font-bold text-lg px-8 py-4 h-auto">
                  <span className="mr-2">{siteContent.home.hero.primaryButton}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <button
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-secondary group inline-flex items-center justify-center font-bold text-lg px-8 py-4 h-auto"
              >
                <Play className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                {siteContent.home.hero.secondaryButton}
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lfc-red rounded-full"></div>
                <span>UEFA B Licensed Coach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lfc-red rounded-full"></div>
                <span>Professional Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lfc-red rounded-full"></div>
                <span>All Weather Training</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
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
    <section id="expectations" className="py-20 lg:py-32 bg-almost-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <Rocket className="w-8 h-8 lg:w-12 lg:h-12 text-lfc-red animate-pulse" />
            <h2 className="text-display text-white">
              WHAT TO EXPECT
            </h2>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Every session is designed to push your boundaries and unlock your true potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {expectations.map((item, index) => (
            <div
              key={index}
              className="group text-center card-hover animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-lfc-red to-bright-red rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-lfc-red/25">
                  <span className="text-3xl lg:text-4xl filter drop-shadow-sm">{item.icon}</span>
                </div>
                <div className="absolute inset-0 bg-lfc-red/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 lg:mt-24 animate-fade-in">
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="relative inline-block">
            <div className="text-2xl lg:text-3xl font-bold text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">
              YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
            </div>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lfc-red to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
