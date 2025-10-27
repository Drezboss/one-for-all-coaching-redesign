import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      ariaLabel: "Book an individual coaching session"
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
      ariaLabel: "Book a group training session"
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
      ariaLabel: "Learn more about coach education programs"
    },
    {
      icon: Handshake,
      title: "🤝 Coach Mentorship",
      subtitle: "You Coach Others. We Coach You.",
      description: "Our mentorship program is designed to support, challenge, and grow coaches through regular 1-to-1 support.",
      features: [
        "Monthly check-ins and development goals",
        "Session reviews & tactical discussions",
        "Career support and leadership development",
        "A space to reflect, improve, and stay accountable",
      ],
      ctaText: "Apply for Mentorship",
      ctaAction: "Because great coaches never stop learning.",
      ariaLabel: "Apply for the coach mentorship program"
    },
  ];

  return (
    <section id="services" className="py-20 bg-black" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-black text-white mb-4">
            OUR <span className="text-lfc-red">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300">Tailored training and development for players and coaches</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8" role="list">
          {services.map((service, index) => (
            <Card 
              key={index} 
              role="listitem"
              className={cn(
                "bg-almost-black border-gray-800 transition-all duration-300",
                "hover:border-lfc-red hover:shadow-2xl hover:shadow-lfc-red/20",
                "hover:transform hover:-translate-y-1",
                "group cursor-pointer"
              )}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-lg text-lfc-red font-semibold mb-4">{service.subtitle}</p>
                <p className="text-gray-300 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-8" role="list">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center text-gray-200 transition-all duration-200 hover:text-white hover:translate-x-1"
                      style={{
                        animationDelay: `${featureIndex * 100}ms`
                      }}
                    >
                      <Check className="w-5 h-5 text-lfc-red mr-3 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {service.ctaAction && (
                  <p className="text-white font-semibold mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.ctaAction}
                  </p>
                )}
                <Link href="/contact">
                  <Button 
                    className="bg-lfc-red text-white hover:bg-bright-red font-semibold group/btn"
                    aria-label={service.ariaLabel}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
