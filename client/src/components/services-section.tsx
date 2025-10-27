import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check } from "lucide-react";
import { useServicesContent } from "@/hooks/useContent";
import { ContentLoader } from "@/components/ui/content-loader";

export function ServicesSection() {
  const servicesContent = useServicesContent();

  const services = [
    {
      icon: User,
      title: servicesContent.data?.individualCoaching.title || "💪 1-2-1 Individual Program Learning",
      subtitle: servicesContent.data?.individualCoaching.subtitle || "Personalised Coaching. Real Progress.",
      description: servicesContent.data?.individualCoaching.description || "Led by a UEFA B License coach, our 1-2-1 sessions are built around you — your position, your goals, your pace.",
      features: servicesContent.data?.individualCoaching.features || [
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
      title: servicesContent.data?.groupSessions.title || "👥 Group Sessions",
      subtitle: servicesContent.data?.groupSessions.subtitle || "Learn Together. Push Each Other. Grow as One.",
      description: servicesContent.data?.groupSessions.description || "Ideal for small teams or friend groups, our sessions focus on shared development with individual attention.",
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
      title: servicesContent.data?.mentorship.title || "🤝 Coach Mentorship",
      subtitle: servicesContent.data?.mentorship.subtitle || "You Coach Others. We Coach You.",
      description: servicesContent.data?.mentorship.description || "Our mentorship program is designed to support, challenge, and grow coaches through regular 1-to-1 support.",
      features: servicesContent.data?.mentorship.features || [
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
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            OUR <span className="text-lfc-red">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300">
            {servicesContent.data?.subtitle || "Tailored training and development for players and coaches"}
          </p>
        </div>

        <ContentLoader 
          loading={servicesContent.loading} 
          error={servicesContent.error} 
          onRetry={servicesContent.reload}
          loadingMessage="Loading services..."
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-almost-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mr-4">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-lg text-lfc-red font-semibold mb-4">{service.subtitle}</p>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-200">
                        <Check className="w-5 h-5 text-lfc-red mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {service.ctaAction && (
                    <p className="text-white font-semibold mb-6">{service.ctaAction}</p>
                  )}
                  <Link href="/contact">
                    <Button className="bg-lfc-red text-white hover:bg-bright-red font-semibold">
                      {service.ctaText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </ContentLoader>
      </div>
    </section>
  );
}
