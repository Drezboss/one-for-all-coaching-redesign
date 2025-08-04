import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowRight, Play, Star, Target, TrendingUp } from "lucide-react";
import { siteContent } from "@shared/content";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-lfc-red rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-bright-red rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary rounded-full opacity-25"
          animate={{
            y: [0, -20, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-60 overflow-hidden">
          <motion.img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-70"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-left max-w-7xl mx-auto container-padding">
        <motion.div 
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center space-x-2 text-sm text-lfc-red font-semibold tracking-wider uppercase mb-6"
            variants={fadeInUp}
          >
            <Star className="w-4 h-4" />
            <span>{siteContent.site.name.toUpperCase()}</span>
            <Star className="w-4 h-4" />
          </motion.div>
          
          <motion.h1 
            className="text-responsive-xl font-black text-white leading-none mb-6"
            variants={fadeInUp}
          >
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <motion.span 
                  key={index} 
                  className="text-gradient"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  {word}
                </motion.span> : 
                <span key={index}>{word}{' '}</span>
            )}
          </motion.h1>
          
          <motion.h2 
            className="text-responsive-lg font-bold text-white mb-6"
            variants={fadeInUp}
          >
            {siteContent.site.tagline.toUpperCase()}
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            {siteContent.home.hero.subtitle}
          </motion.p>
          
          <motion.blockquote 
            className="text-2xl lg:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic relative"
            variants={fadeInUp}
          >
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-lfc-red to-bright-red rounded-full"></div>
            "{siteContent.coach.quote}"
          </motion.blockquote>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <Link href="/individual-coaching">
              <Button className="btn-primary text-lg px-8 py-4 group">
                <span>{siteContent.home.hero.primaryButton}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <button
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="btn-secondary text-lg px-8 py-4 group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>{siteContent.home.hero.secondaryButton}</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
            variants={fadeInUp}
          >
            {[
              { number: "500+", label: "Sessions Delivered" },
              { number: "50+", label: "Happy Players" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl lg:text-3xl font-black text-lfc-red">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export function ExpectationSection() {
  const expectations = [
    {
      icon: Target,
      title: "Personalised Training Plans",
      description: "Tailored to your strengths and goals",
      color: "from-lfc-red to-bright-red"
    },
    {
      icon: TrendingUp,
      title: "Technical & Physical Development",
      description: "That matches your playing style",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Star,
      title: "Honest Feedback",
      description: "And consistent progression tracking",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Rocket,
      title: "Mental Focus",
      description: "And confidence-building woven into every session",
      color: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <section id="expectations" className="section-padding bg-almost-black relative overflow-hidden">
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
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-responsive-xl font-black text-white mb-4">
            WHAT TO <span className="text-gradient">EXPECT</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Every session is designed to push you forward while building your confidence and love for the game.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {expectations.map((item, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-2xl lg:text-3xl font-black text-gradient">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </motion.div>
      </div>
    </section>
  );
}
