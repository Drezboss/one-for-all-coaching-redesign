import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { siteContent } from "@shared/content";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Better Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Hero Image with Better Positioning */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
        <div className="w-full h-full bg-gradient-to-l from-transparent via-black/20 to-black/60 overflow-hidden">
          <img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - Professional Football Coach in action"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-700 hover:opacity-80"
            loading="eager"
          />
        </div>
      </div>

      {/* Enhanced Content with Animations */}
      <motion.div 
        className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-4xl">
          {/* Enhanced Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 text-sm bg-lfc-red/20 text-lfc-red font-semibold tracking-wider uppercase mb-6 px-4 py-2 rounded-full border border-lfc-red/30"
            variants={fadeInUp}
          >
            <Star className="w-4 h-4" />
            {siteContent.site.name}
          </motion.div>
          
          {/* Improved Typography Hierarchy */}
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-6"
            variants={fadeInUp}
          >
            {siteContent.home.hero.title.split(' ').map((word, index) => (
              <span key={index} className={word === 'POTENTIAL' ? 'text-lfc-red' : ''}>
                {word}
                {index < siteContent.home.hero.title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </motion.h1>
          
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/90 mb-8"
            variants={fadeInUp}
          >
            {siteContent.site.tagline.toUpperCase()}
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed"
            variants={fadeInUp}
          >
            {siteContent.home.hero.subtitle}
          </motion.p>
          
          {/* Enhanced Quote with Better Styling */}
          <motion.blockquote 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-lfc-red mb-12 max-w-3xl italic relative"
            variants={fadeInUp}
          >
            <span className="text-4xl absolute -top-2 -left-2 opacity-50">"</span>
            {siteContent.coach.quote}
            <span className="text-4xl absolute -bottom-4 opacity-50">"</span>
          </motion.blockquote>
          
          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-start"
            variants={fadeInUp}
          >
            <Link href="/individual-coaching">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200 group">
                  {siteContent.home.hero.primaryButton}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200 rounded-md group"
            >
              {siteContent.home.hero.secondaryButton}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function ExpectationSection() {
  const expectations = [
    {
      icon: "🎯",
      title: "Personalised Training Plans",
      description: "Tailored to your strengths and goals",
    },
    {
      icon: "💪",
      title: "Technical & Physical Development",
      description: "That matches your playing style",
    },
    {
      icon: "📈",
      title: "Honest Feedback",
      description: "And consistent progression tracking",
    },
    {
      icon: "🧠",
      title: "Mental Focus",
      description: "And confidence-building woven into every session",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="expectations" className="py-20 bg-almost-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 flex items-center justify-center gap-4">
            <Rocket className="w-12 h-12 text-lfc-red" />
            WHAT TO EXPECT
          </h2>
          <div className="w-24 h-1 bg-lfc-red mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {expectations.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-lg bg-gradient-to-b from-gray-900/50 to-transparent hover:from-gray-900/70"
            >
              <div className="w-20 h-20 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-bright-red transition-all duration-300 shadow-lg">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <div className="text-2xl font-bold text-lfc-red tracking-wide">
            YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
          </div>
        </motion.div>
      </div>
    </section>
  );
}
