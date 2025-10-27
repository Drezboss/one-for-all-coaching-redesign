import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import { siteContent } from "@shared/content";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Sparkles className="w-2 h-2 text-lfc-red/20" />
          </div>
        ))}
      </div>

      {/* Parallax image */}
      <div 
        className="absolute top-0 right-0 w-full lg:w-3/5 h-full"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/50 to-black"></div>
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className={cn(
            "text-sm text-lfc-red font-semibold tracking-wider uppercase mb-6 flex items-center",
            "transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="w-8 h-px bg-lfc-red mr-3"></div>
            {siteContent.site.name.toUpperCase()}
          </div>
          
          <h1 className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-8",
            "transition-all duration-1000 transform delay-200",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            {siteContent.home.hero.title.split(' ').map((word, index) => (
              <span key={index} className="inline-block">
                {word === 'POTENTIAL' ? (
                  <span className="text-lfc-red relative">
                    {word}
                    <span className="absolute -inset-1 bg-lfc-red/20 blur-xl"></span>
                  </span>
                ) : (
                  word
                )}
                {index < siteContent.home.hero.title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h1>
          
          <h2 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8",
            "transition-all duration-1000 transform delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            {siteContent.site.tagline.toUpperCase()}
          </h2>
          
          <p className={cn(
            "text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed",
            "transition-all duration-1000 transform delay-400",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            {siteContent.home.hero.subtitle}
          </p>
          
          <blockquote className={cn(
            "relative text-xl sm:text-2xl md:text-3xl font-bold text-lfc-red mb-12 max-w-2xl italic",
            "transition-all duration-1000 transform delay-500",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <span className="absolute -left-4 -top-4 text-6xl text-lfc-red/20">"</span>
            {siteContent.coach.quote}
            <span className="absolute -right-4 bottom-0 text-6xl text-lfc-red/20">"</span>
          </blockquote>
          
          <div className={cn(
            "flex flex-col sm:flex-row gap-4",
            "transition-all duration-1000 transform delay-600",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <Link href="/individual-coaching">
              <Button 
                className="group relative bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lfc-red/20"
              >
                {siteContent.home.hero.primaryButton}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/20 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Button>
            </Link>
            <button
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group relative border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6 transition-all duration-300 rounded-md hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">{siteContent.home.hero.secondaryButton}</span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('expectations');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const expectations = [
    {
      icon: "🎯",
      title: "Personalised Training Plans",
      description: "Tailored to your strengths and goals",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: "💪",
      title: "Technical & Physical Development",
      description: "That matches your playing style",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: "📈",
      title: "Honest Feedback",
      description: "And consistent progression tracking",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🧠",
      title: "Mental Focus",
      description: "And confidence-building woven into every session",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="expectations" className="py-24 bg-gradient-to-b from-almost-black to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="inline-flex items-center justify-center mb-6">
            <Rocket className="w-12 h-12 text-lfc-red mr-4 animate-pulse" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
              WHAT TO EXPECT
            </h2>
          </div>
          <div className="w-24 h-1 bg-lfc-red mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {expectations.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group relative transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-almost-black p-8 rounded-2xl border border-gray-800 hover:border-lfc-red/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lfc-red/10 h-full">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br",
                  item.color,
                  "transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                )}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-lfc-red">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "text-center transition-all duration-1000 delay-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, 
            or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="relative inline-block">
            <div className="text-2xl md:text-3xl font-black text-lfc-red">
              YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
            </div>
            <div className="absolute -inset-2 bg-lfc-red/20 blur-xl rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
