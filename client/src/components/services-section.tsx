import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { User, Users, GraduationCap, Handshake, Check, ArrowRight, Star } from "lucide-react";
import { siteContent } from "@shared/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
      title: siteContent.services.individualCoaching.title,
      subtitle: siteContent.services.individualCoaching.subtitle,
      description: siteContent.services.individualCoaching.description,
      features: siteContent.services.individualCoaching.features,
      ctaText: "Start Individual Coaching",
      ctaAction: "Become the best version of yourself — one session at a time.",
      href: "/individual-coaching",
      gradient: "from-primary/20 to-primary/5",
      popular: true,
    },
    {
      icon: Users,
      title: siteContent.services.groupSessions.title,
      subtitle: siteContent.services.groupSessions.subtitle,
      description: siteContent.services.groupSessions.description,
      features: [
        "Game-relevant drills and scenario play",
        "Communication and decision-making focus",
        "Fitness, teamwork, and leadership training",
        "Custom sessions for all ability levels",
      ],
      ctaText: "Book Group Session",
      href: "/group-sessions",
      gradient: "from-secondary/20 to-secondary/5",
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
      href: "/contact",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Handshake,
      title: siteContent.services.mentorship.title,
      subtitle: siteContent.services.mentorship.subtitle,
      description: siteContent.services.mentorship.description,
      features: siteContent.services.mentorship.features,
      ctaText: "Apply for Mentorship",
      ctaAction: "Because great coaches never stop learning.",
      href: "/contact",
      gradient: "from-muted/20 to-muted/5",
    },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-sm bg-primary/20 text-primary font-semibold tracking-wider uppercase mb-6 px-4 py-2 rounded-full border border-primary/30">
            <Star className="w-4 h-4" />
            Our Services
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            {siteContent.services.title}
          </h2>
          
          <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {siteContent.services.subtitle}
          </p>
          
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`card-elevated h-full hover-lift relative overflow-hidden bg-gradient-to-br ${service.gradient} border-2 hover:border-primary/50 transition-all duration-300`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {service.title}
                  </CardTitle>
                  
                  <p className="text-lg text-primary font-semibold">
                    {service.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-start text-foreground group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-primary/30 transition-colors duration-200">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {service.ctaAction && (
                    <div className="bg-card/50 rounded-lg p-4 border-l-4 border-primary">
                      <p className="text-foreground font-medium italic">
                        {service.ctaAction}
                      </p>
                    </div>
                  )}

                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button className="btn-primary w-full group text-lg py-6 shadow-lg hover:shadow-xl">
                        {service.ctaText}
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Whether you're a player looking to develop your skills or a coach seeking to grow your expertise, 
            we're here to support your football journey every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="btn-primary group">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="outline" className="group">
                  Learn About Dave
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
