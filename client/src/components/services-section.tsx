import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight, Sparkles } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: User,
      title: "1-2-1 Individual Program Learning",
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
      gradient: "from-blue-600 to-blue-400",
      bgGradient: "from-blue-600/10 to-blue-400/5",
    },
    {
      icon: Users,
      title: "Group Sessions",
      subtitle: "Learn Together. Push Each Other. Grow as One.",
      description: "Ideal for small teams or friend groups, our sessions focus on shared development with individual attention.",
      features: [
        "Game-relevant drills and scenario play",
        "Communication and decision-making focus",
        "Fitness, teamwork, and leadership training",
        "Custom sessions for all ability levels",
      ],
      ctaText: "Book Group Session",
      gradient: "from-green-600 to-green-400",
      bgGradient: "from-green-600/10 to-green-400/5",
    },
    {
      icon: GraduationCap,
      title: "Coach Education",
      subtitle: "Better Coaches. Stronger Players.",
      description: "We support coaches at every level with workshops, session planning, and ongoing development built on real football principles.",
      features: [
        "Coaching methodology & practice design",
        "Long-Term Player Development (LTPD) guidance",
        "Game analysis and reflection tools",
        "CPD-style education tailored to your environment",
      ],
      ctaText: "Learn More",
      gradient: "from-purple-600 to-purple-400",
      bgGradient: "from-purple-600/10 to-purple-400/5",
    },
    {
      icon: Handshake,
      title: "Coach Mentorship",
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
      gradient: "from-orange-600 to-orange-400",
      bgGradient: "from-orange-600/10 to-orange-400/5",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-lfc-red/5 via-transparent to-lfc-red/5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lfc-red to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-medium text-white/90">
            <Sparkles className="w-4 h-4 text-lfc-red" />
            WHAT WE OFFER
            <Sparkles className="w-4 h-4 text-lfc-red" />
          </div>
          <h2 className="text-display text-white mb-6">
            OUR <span className="text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tailored training and development programs designed to unlock potential at every level of the beautiful game
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative bg-almost-black/80 border-gray-800/50 hover:border-lfc-red/50 transition-all duration-500 card-hover backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-lfc-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="relative p-8 lg:p-10">
                {/* Service icon and title */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-lfc-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-lg text-lfc-red font-semibold mb-4">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Service description */}
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature list */}
                <div className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-start gap-3 text-gray-200 group/feature"
                      style={{ animationDelay: `${(index * 150) + (featureIndex * 50)}ms` }}
                    >
                      <div className="relative mt-1">
                        <Check className="w-5 h-5 text-lfc-red group-hover/feature:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-lfc-red/20 rounded-full blur-sm opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="flex-1 group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                {service.ctaAction && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-lfc-red/10 to-transparent rounded-lg border-l-4 border-lfc-red">
                    <p className="text-white font-semibold italic">
                      {service.ctaAction}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <Link href="/contact" className="block">
                  <Button className="group/btn w-full bg-lfc-red hover:bg-lfc-red/90 text-white font-semibold text-lg py-4 h-auto transition-all duration-300 hover:shadow-lg hover:shadow-lfc-red/25 hover:-translate-y-1">
                    <span className="mr-2">{service.ctaText}</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16 lg:mt-24">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Ready to Start Your Football Journey?
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Whether you're a player looking to improve or a coach seeking development, we're here to help you reach your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-primary bg-lfc-red hover:bg-lfc-red/90 text-white font-bold text-lg px-8 py-4 h-auto">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 h-auto">
                  Learn More About Dave
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
