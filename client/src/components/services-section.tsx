import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, User, ArrowRight, Star, Clock, Target } from "lucide-react";
import { siteContent } from "@shared/content";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const services = [
    {
      icon: User,
      iconBg: "from-red-500 to-orange-500",
      title: siteContent.home.services.individual.title,
      description: siteContent.home.services.individual.description,
      features: siteContent.home.services.individual.features,
      href: "/individual-coaching",
      accentColor: "text-orange-500",
      borderColor: "border-orange-500/20 hover:border-orange-500/50",
    },
    {
      icon: Users,
      iconBg: "from-blue-500 to-purple-500",
      title: siteContent.home.services.group.title,
      description: siteContent.home.services.group.description,
      features: siteContent.home.services.group.features,
      href: "/group-sessions",
      accentColor: "text-purple-500",
      borderColor: "border-purple-500/20 hover:border-purple-500/50",
    },
  ];

  const featureIcons = [Star, Clock, Target];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black to-almost-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-lfc-red/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Our <span className="text-lfc-red">Coaching</span> Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the coaching style that fits your needs. Whether you prefer personalized 1-on-1 sessions 
            or the energy of group training, we'll help you reach your full potential.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group relative transition-all duration-700 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={cn(
                  "relative bg-gradient-to-br from-gray-900 to-almost-black p-8 md:p-10 rounded-2xl border transition-all duration-300",
                  service.borderColor,
                  "hover:shadow-2xl hover:scale-[1.02]",
                  hoveredService === index && "shadow-2xl"
                )}>
                  {/* Hover glow effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    "bg-gradient-to-br",
                    index === 0 ? "from-orange-500/10 to-transparent" : "from-purple-500/10 to-transparent"
                  )}></div>

                  <div className="relative">
                    {/* Icon */}
                    <div className={cn(
                      "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8",
                      service.iconBg,
                      "transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    )}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title and description */}
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-bold text-white mb-4 transition-colors duration-300",
                      hoveredService === index && service.accentColor
                    )}>
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => {
                        const FeatureIcon = featureIcons[featureIndex % featureIcons.length];
                        return (
                          <div 
                            key={featureIndex} 
                            className={cn(
                              "flex items-start transition-all duration-300",
                              "transform group-hover:translate-x-2"
                            )}
                            style={{
                              transitionDelay: `${featureIndex * 50}ms`
                            }}
                          >
                            <div className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0",
                              "bg-gradient-to-br",
                              service.iconBg
                            )}>
                              <FeatureIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-gray-300 leading-relaxed">{feature}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <Link href={service.href}>
                      <Button 
                        className={cn(
                          "w-full sm:w-auto bg-lfc-red hover:bg-bright-red text-white font-bold",
                          "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                          "group/btn relative overflow-hidden"
                        )}
                        size="lg"
                      >
                        <span className="relative z-10 flex items-center">
                          Learn More
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <p className="text-xl text-gray-300 mb-6">
            Not sure which option is right for you?
          </p>
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
