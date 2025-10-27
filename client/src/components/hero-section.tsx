import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowDown, Play, Star } from "lucide-react";
import { siteContent } from "@shared/content";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-lfc-red rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-lfc-red rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-lfc-red rounded-full animate-bounce"></div>
      </div>

      {/* Hero image with enhanced positioning */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-60 overflow-hidden">
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-700"
          />
        </div>
      </div>

      {/* Main content with enhanced animations */}
      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className={`text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4 animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-100`}>
            {siteContent.site.name.toUpperCase()}
          </div>

          {/* Main heading with enhanced typography */}
          <h1 className={`responsive-text font-black text-white leading-none mb-6 text-shadow-lg animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-200`}>
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <span key={index} className="text-gradient">{word}</span> : 
                word + (index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : '')
            )}
          </h1>

          {/* Subtitle */}
          <h2 className={`responsive-text-sm font-bold text-white mb-6 animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-300`}>
            {siteContent.site.tagline.toUpperCase()}
          </h2>

          {/* Description */}
          <p className={`text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-400`}>
            {siteContent.home.hero.subtitle}
          </p>

          {/* Quote with enhanced styling */}
          <blockquote className={`text-2xl md:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-500`}>
            <Star className="inline-block w-6 h-6 mr-2 text-bright-red" />
            "{siteContent.coach.quote}"
          </blockquote>

          {/* CTA buttons with enhanced interactions */}
          <div className={`flex flex-col sm:flex-row gap-4 animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-600`}>
            <Link href="/individual-coaching">
              <Button className="btn-primary group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
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
              className="btn-secondary group"
            >
              <ArrowDown className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform duration-200" />
              {siteContent.home.hero.secondaryButton}
            </button>
          </div>

          {/* Trust indicators */}
          <div className={`mt-12 flex items-center space-x-8 animate-fade-in-up ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700 delay-700`}>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-lfc-red rounded-full border-2 border-black"></div>
                ))}
              </div>
              <span className="text-sm text-gray-300">100+ Players Coached</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">5-Star Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-1000 delay-1000`}>
        <ArrowDown className="w-6 h-6 text-white" />
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
      delay: 100,
    },
    {
      icon: "💪",
      title: "Technical & Physical Development",
      description: "That matches your playing style",
      delay: 200,
    },
    {
      icon: "📈",
      title: "Honest Feedback",
      description: "And consistent progression tracking",
      delay: 300,
    },
    {
      icon: "🧠",
      title: "Mental Focus",
      description: "And confidence-building woven into every session",
      delay: 400,
    },
  ];

  return (
    <section id="expectations" className="py-20 bg-almost-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-in-up">
            <Rocket className="inline-block w-12 h-12 text-lfc-red mr-4 animate-pulse" />
            WHAT TO EXPECT
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expectations.map((item, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-bright-red transition-all duration-300 group-hover:rotate-12">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-200 mb-8 animate-fade-in-up">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-2xl font-bold text-gradient animate-fade-in-up">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </div>
      </div>
    </section>
  );
}
