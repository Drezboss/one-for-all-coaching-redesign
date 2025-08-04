import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

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
      color: "from-lfc-red to-bright-red",
      gradient: "from-red-500/20 to-orange-500/20"
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
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/20 to-cyan-500/20"
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
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-500/20 to-emerald-500/20"
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
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
  ];

  return (
    <section id="services" className="section-padding bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-lfc-red via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lfc-red to-bright-red rounded-2xl mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-responsive-xl font-black text-white mb-6">
            OUR <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored training and development for players and coaches at every level
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`bg-almost-black border-gray-800 hover:border-lfc-red transition-all duration-300 card-hover group relative overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-lfc-red transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-lfc-red font-semibold mb-4 group-hover:text-bright-red transition-colors duration-300">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center text-gray-200 group-hover:text-gray-100 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-lfc-red to-bright-red rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {service.ctaAction && (
                    <p className="text-white font-semibold mb-6 italic group-hover:text-lfc-red transition-colors duration-300">
                      "{service.ctaAction}"
                    </p>
                  )}
                  
                  <Link href="/contact">
                    <Button className={`bg-gradient-to-r ${service.color} text-white hover:shadow-lg font-semibold group/btn transition-all duration-300`}>
                      <span>{service.ctaText}</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-lfc-red/10 to-bright-red/10 rounded-2xl p-8 border border-lfc-red/20">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you're a player looking to improve or a coach wanting to develop, we have the perfect program for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-primary text-lg px-8 py-4 group">
                  <span>Book Your Session</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary text-lg px-8 py-4 group">
                  <span>Learn More About Dave</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
