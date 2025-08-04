import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Medal, Users, Shield, ArrowRight, Star } from "lucide-react";
import { siteContent } from "@shared/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* Enhanced About Section */}
      <section id="about" className="section-padding bg-gradient-to-b from-secondary/5 to-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl shadow-2xl w-full h-96 overflow-hidden hover-lift">
                <img 
                  src={siteContent.images.coach.celebration}
                  alt="Dave Cornock - UEFA B Licensed Coach celebrating success with players"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-sm bg-primary/20 text-primary font-semibold tracking-wider uppercase mb-6 px-4 py-2 rounded-full border border-primary/30">
                <Star className="w-4 h-4" />
                About Your Coach
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                {siteContent.home.whyChoose.title}
              </h2>
              
              <p className="text-responsive-lg text-muted-foreground mb-8 leading-relaxed">
                {siteContent.home.whyChoose.description}
              </p>

              <div className="space-y-6 mb-8">
                {siteContent.home.whyChoose.features.map((feature, index) => {
                  const icons = [Medal, Users, Shield];
                  const Icon = icons[index];
                  return (
                    <motion.div 
                      key={index} 
                      className="flex items-start group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button className="btn-primary group text-lg px-8 py-4">
                      Meet Your Coach
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button variant="outline" className="group text-lg px-8 py-4 border-2">
                      Book a Session
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
