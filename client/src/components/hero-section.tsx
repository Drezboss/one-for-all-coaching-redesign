import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, ChevronDown } from "lucide-react";
import { siteContent } from "@shared/content";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"
        animate={{
          background: [
            "linear-gradient(to bottom right, #000000, #0f172a, #0a0a0a)",
            "linear-gradient(to bottom right, #0a0a0a, #1e293b, #000000)",
            "linear-gradient(to bottom right, #000000, #0f172a, #0a0a0a)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 overflow-hidden">
          <motion.img 
            src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
            alt="Dave Cornock - All Weather Professional Football Coach"
            className="w-full h-full object-cover opacity-60"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      <motion.div 
        className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.div 
            className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4"
            variants={staggerItem}
          >
            {siteContent.site.name.toUpperCase()}
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white leading-none mb-6"
            variants={staggerItem}
          >
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <motion.span 
                  key={index} 
                  className="text-lfc-red inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(220, 38, 38, 0.5)",
                      "0 0 40px rgba(220, 38, 38, 0.8)",
                      "0 0 20px rgba(220, 38, 38, 0.5)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {word}
                </motion.span> : 
                word + (index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : '')
            )}
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            variants={staggerItem}
          >
            {siteContent.site.tagline.toUpperCase()}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed"
            variants={staggerItem}
          >
            {siteContent.home.hero.subtitle}
          </motion.p>
          
          <motion.blockquote 
            className="text-2xl md:text-3xl font-bold text-lfc-red mb-10 max-w-2xl italic"
            variants={staggerItem}
          >
            "{siteContent.coach.quote}"
          </motion.blockquote>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={staggerItem}
          >
            <Link href="/individual-coaching">
              <Button 
                className="bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4"
                size="xl"
                variant="premium"
              >
                {siteContent.home.hero.primaryButton}
              </Button>
            </Link>
            <motion.button
              onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200 rounded-md relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{siteContent.home.hero.secondaryButton}</span>
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
}

export function ExpectationSection() {
  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-almost-black via-dark-navy to-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            WHAT <span className="text-lfc-red">YOU CAN EXPECT</span>
          </h2>
          <p className="text-xl text-gray-300">Professional football coaching tailored to your journey</p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {siteContent.home.expectations.map((expectation, index) => (
            <motion.div
              key={index}
              className="bg-almost-black border border-gray-800 rounded-lg p-8 hover:border-lfc-red transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{expectation.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{expectation.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
