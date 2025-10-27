import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
      gradient: "from-lfc-red to-bright-red",
      href: "/individual-coaching",
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
      gradient: "from-purple-600 to-pink-600",
      href: "/group-sessions",
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
      gradient: "from-blue-600 to-cyan-600",
      href: "/contact",
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
      gradient: "from-green-600 to-emerald-600",
      href: "/contact",
    },
  ];

  return (
    <section id="services" className="py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:40px_40px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-lfc-red/20 to-bright-red/20 border border-lfc-red/30 text-sm font-semibold text-lfc-red tracking-wide">
              ⚡ COMPREHENSIVE TRAINING SOLUTIONS
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            OUR{" "}
            <span className="bg-gradient-to-r from-lfc-red via-bright-red to-lfc-red bg-clip-text text-transparent">
              SERVICES
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Tailored training and development for players and coaches at every level
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-lfc-red to-bright-red mx-auto mt-8 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 border border-gray-800/50 backdrop-blur-sm group-hover:border-lfc-red/30 transition-all duration-500 hover:shadow-2xl hover:shadow-lfc-red/10">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                
                {/* Subtle Border Glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-lfc-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <CardContent className="relative p-8 z-10">
                  {/* Enhanced Header */}
                  <motion.div 
                    className="flex items-center mb-6"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </motion.div>

                  {/* Enhanced Subtitle */}
                  <motion.p 
                    initial={{ opacity: 0.8 }}
                    whileInView={{ opacity: 1 }}
                    className="text-lg font-semibold mb-4 bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent"
                  >
                    {service.subtitle}
                  </motion.p>
                  
                  {/* Enhanced Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Enhanced Feature List */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-200 group-hover:text-white transition-colors duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 bg-gradient-to-br from-lfc-red to-bright-red rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Call to Action Text */}
                  {service.ctaAction && (
                    <motion.p 
                      initial={{ opacity: 0.8 }}
                      whileInView={{ opacity: 1 }}
                      className="text-white font-semibold mb-6 italic text-center py-3 px-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg backdrop-blur-sm border border-white/10"
                    >
                      {service.ctaAction}
                    </motion.p>
                  )}

                  {/* Enhanced CTA Button */}
                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className={`w-full group relative overflow-hidden bg-gradient-to-r ${service.gradient} text-white font-semibold py-3 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-current/25`}>
                        <span className="relative z-10 flex items-center justify-center">
                          {service.ctaText}
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lfc-red to-bright-red rounded-full mb-6 shadow-xl shadow-lfc-red/25">
            <span className="text-2xl">⚽</span>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to take your game to the next level? Choose the service that fits your goals and let's start your journey together.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-lfc-red to-bright-red text-white font-bold px-8 py-4 text-lg hover:scale-105 transition-transform duration-300 shadow-xl shadow-lfc-red/25">
              Get Started Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
