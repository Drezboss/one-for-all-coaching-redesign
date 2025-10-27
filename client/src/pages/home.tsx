import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield, ArrowRight, Star, CheckCircle } from "lucide-react";
import { siteContent } from "@shared/content";
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

const itemVariants = {
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

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* About Section */}
      <section id="about" className="section-padding bg-almost-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-lfc-red via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <div className="relative group">
                <div className="rounded-2xl shadow-2xl w-full h-96 lg:h-[500px] overflow-hidden">
                  <img 
                    src={siteContent.images.coach.celebration}
                    alt="Dave Cornock - Celebrating Success with Players"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-lfc-red rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-bright-red rounded-full opacity-30 animate-pulse delay-1000"></div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.h2 
                  className="text-responsive-xl font-black text-white mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {siteContent.home.whyChoose.title.split(' ').map((word, index) => (
                    <span key={index} className={word.toLowerCase().includes('dave') ? 'text-gradient' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </motion.h2>
                
                <motion.p 
                  className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {siteContent.home.whyChoose.description}
                </motion.p>
              </div>

              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {siteContent.home.whyChoose.features.map((feature, index) => {
                  const icons = [Medal, Users, Shield];
                  const Icon = icons[index];
                  return (
                    <motion.div 
                      key={index} 
                      className="flex items-start group"
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-lfc-red to-bright-red rounded-xl flex items-center justify-center mr-6 mt-1 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-lfc-red to-bright-red rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-lfc-red transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/about">
                  <Button className="btn-primary text-lg px-8 py-4 group">
                    <span>Meet Your Coach</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="btn-secondary text-lg px-8 py-4 group">
                    <span>Book a Session</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="section-padding bg-black relative">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-xl font-black text-white mb-6">
              What <span className="text-gradient">Parents Say</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what parents and players have to say about their experience with One For All Coaching.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote: "Dave's coaching has transformed my son's confidence on the pitch. His individual approach really makes a difference.",
                author: "Sarah Johnson",
                role: "Parent of U12 Player",
                rating: 5
              },
              {
                quote: "The group sessions are fantastic. My daughter has improved so much and loves coming to training every week.",
                author: "Michael Chen",
                role: "Parent of U14 Player",
                rating: 5
              },
              {
                quote: "Professional, passionate, and patient. Dave really knows how to bring out the best in every player.",
                author: "Emma Thompson",
                role: "Parent of U16 Player",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-2xl p-8 hover:border-lfc-red transition-all duration-300 card-hover group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-lfc-red to-bright-red rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <Button className="btn-primary text-lg px-8 py-4 group">
                <span>Join Our Success Stories</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
