import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowRight, Play } from "lucide-react";
import { siteContent } from "@shared/content";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-60 overflow-hidden">
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </div>

      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-6 animate-fade-in">
            {siteContent.site.name.toUpperCase()}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 animate-fade-in-up">
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <span key={index} className="text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">{word}</span> : 
                word + (index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : '')
            )}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-relaxed animate-fade-in-up delay-200">
            {siteContent.site.tagline.toUpperCase()}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl leading-relaxed animate-fade-in-up delay-300">
            {siteContent.home.hero.subtitle}
          </p>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-lfc-red mb-12 max-w-3xl italic border-l-4 border-lfc-red pl-6 animate-fade-in-up delay-400">
            "{siteContent.coach.quote}"
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-500">
            <Link href="/individual-coaching">
              <Button className="group bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {siteContent.home.hero.primaryButton}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <button
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-300 rounded-lg transform hover:-translate-y-1"
            >
              <Play className="inline-block w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              {siteContent.home.hero.secondaryButton}
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
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
    <section id="expectations" className="py-20 bg-almost-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <Rocket className="inline-block w-12 h-12 text-lfc-red mr-4 animate-pulse" />
            WHAT TO EXPECT
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every session is designed to push you forward while building confidence and developing your unique playing style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expectations.map((item, index) => (
            <div
              key={index}
              className="group text-center hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-lg hover:bg-black/20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-lfc-red to-bright-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-lfc-red/25 transition-all duration-300">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-2xl font-bold text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </div>
      </div>
    </section>
  );
}
