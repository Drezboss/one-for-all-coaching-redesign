import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: User,
      title: "💪 1-2-1 Individual Program Learning",
      subtitle: "Personalised Coaching. Real Progress.",
      description: "Led by a UEFA B License coach, our 1-2-1 sessions are built around you — your position, your goals, your pace.",
      features: [
        "Custom technical/tactical training",
        "Physical conditioning & mindset coaching",
        "Performance tracking and video feedback",
        "Focused, player-first approach",
      ],
      ctaText: "Book Individual Session",
      ctaAction: "Become the best version of yourself — one session at a time.",
      href: "/individual-coaching",
      color: "primary",
    },
    {
      icon: Users,
      title: "👥 Group Sessions",
      subtitle: "Learn Together. Push Each Other. Grow as One.",
      description: "Ideal for small teams or friend groups, our sessions focus on shared development with individual attention.",
      features: [
        "Game-relevant drills and scenario play",
        "Communication and decision-making focus",
        "Fitness, teamwork, and leadership training",
        "Custom sessions for all ability levels",
      ],
      ctaText: "Book Group Session",
      href: "/group-sessions",
      color: "secondary",
    },
    {
      icon: GraduationCap,
      title: "🎓 Coach Education",
      subtitle: "Better Coaches. Stronger Players.",
      description: "We support coaches at every level with workshops, session planning, and ongoing development built on real football principles.",
      features: [
        "Coaching methodology & practice design",
        "Long-Term Player Development (LTPD) guidance",
        "Game analysis and reflection tools",
        "CPD-style education tailored to your environment",
      ],
      ctaText: "Learn More",
      href: "/about",
      color: "accent",
    },
    {
      icon: Handshake,
      title: "🤝 Coach Mentorship",
      subtitle: "Experience. Guidance. Growth.",
      description: "One-on-one mentorship for grassroots coaches looking to develop their knowledge, confidence, and impact on young players.",
      features: [
        "Personal coaching development plans",
        "Observation and constructive feedback",
        "UEFA B License holder guidance",
        "Support for FA pathway progression",
      ],
      ctaText: "Get Mentorship",
      href: "/about",
      color: "success",
    },
  ];

  return (
    <section 
      id="services" 
      className="section-padding bg-dark-navy"
      aria-labelledby="services-title"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            id="services-title"
            className="text-4xl md:text-5xl font-black text-white mb-4 focus:outline-none"
            tabIndex={-1}
          >
            OUR SERVICES
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive football coaching services designed to unlock potential at every level, 
            from individual players to coaching development.
          </p>
        </div>

        <div 
          className="grid gap-8 md:gap-10 lg:grid-cols-2 xl:gap-12"
          role="list"
          aria-label="Available coaching services"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = index < 2; // First two cards are larger
            
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-card border-2 border-transparent hover:border-lfc-red transition-all duration-300 hover:shadow-glow animate-slide-up ${
                  isLarge ? 'lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                role="listitem"
              >
                <CardContent className="p-8 lg:p-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-lfc-red rounded-xl flex items-center justify-center mr-6 group-hover:bg-bright-red transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-lg font-semibold text-lfc-red">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed flex-grow-0">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                      What's Included:
                    </h4>
                    <ul 
                      className="space-y-3"
                      role="list"
                      aria-label={`Features of ${service.title}`}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="flex items-start"
                          role="listitem"
                        >
                          <Check 
                            className="w-5 h-5 text-lfc-red mr-3 mt-0.5 flex-shrink-0" 
                            aria-hidden="true"
                          />
                          <span className="text-muted-foreground text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-6">
                    {service.ctaAction && (
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        {service.ctaAction}
                      </p>
                    )}
                    <Link href={service.href}>
                      <Button 
                        className="w-full bg-lfc-red text-white hover:bg-bright-red font-semibold group/btn transition-all duration-200 transform hover:-translate-y-0.5"
                        size="lg"
                        aria-label={`${service.ctaText} - Learn more about ${service.title}`}
                      >
                        {service.ctaText}
                        <ArrowRight 
                          className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" 
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>
                  </div>
                </CardContent>

                {/* Decorative element */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lfc-red/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-almost-black rounded-2xl p-8 lg:p-12 border border-gray-800">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking for individual coaching, group sessions, or coach development, 
              we're here to help you reach your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="xl"
                  className="bg-lfc-red text-white hover:bg-bright-red font-bold transform hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Contact us to book a session"
                >
                  Book Your Session Today
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-black font-bold transition-all duration-200"
                  aria-label="Learn more about our coach Dave Cornock"
                >
                  Meet Your Coach
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
