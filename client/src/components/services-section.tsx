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
      color: "from-red-500 to-red-600",
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
      color: "from-blue-500 to-blue-600",
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
      color: "from-green-500 to-green-600",
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
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            OUR <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored training and development for players and coaches at every level
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-almost-black border-gray-800 hover:border-lfc-red transition-all duration-300 hover:shadow-xl hover:shadow-lfc-red/10 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-lfc-red transition-colors duration-300">{service.title}</h3>
                </div>
                <p className="text-lg text-lfc-red font-semibold mb-4">{service.subtitle}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
                      <div className="w-5 h-5 bg-lfc-red rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.ctaAction && (
                  <p className="text-white font-semibold mb-6 italic">{service.ctaAction}</p>
                )}
                <Link href="/contact">
                  <Button className="group/btn bg-lfc-red text-white hover:bg-bright-red font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    {service.ctaText}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-almost-black to-black rounded-2xl border border-gray-800">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you're a player looking to improve or a coach wanting to develop, we have the expertise and passion to help you reach your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-lfc-red text-white hover:bg-bright-red font-semibold px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 transition-all duration-300">
                Learn More About Dave
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
