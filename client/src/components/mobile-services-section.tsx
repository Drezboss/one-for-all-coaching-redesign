import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check } from "lucide-react";

export function MobileServicesSection() {
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
    },
  ];

  return (
    <section id="services" className="py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            OUR <span className="text-lfc-red">SERVICES</span>
          </h2>
          <p className="text-lg text-gray-300">Tailored training and development for players and coaches</p>
        </div>

        {/* Services Cards - Stacked Vertically for Mobile */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-almost-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
              <CardContent className="p-6">
                {/* Service Header */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-lfc-red rounded-lg flex items-center justify-center mr-3">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                </div>

                {/* Subtitle */}
                <p className="text-base text-lfc-red font-semibold mb-3">{service.subtitle}</p>

                {/* Description */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{service.description}</p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-gray-200 text-sm">
                      <Check className="w-4 h-4 text-lfc-red mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Text */}
                {service.ctaAction && (
                  <p className="text-white font-semibold mb-4 text-sm">{service.ctaAction}</p>
                )}

                {/* CTA Button - Full Width, Thumb-Friendly */}
                <Link href="/contact" className="block">
                  <Button className="w-full bg-lfc-red text-white hover:bg-bright-red font-semibold py-3 min-h-[44px]">
                    {service.ctaText}
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