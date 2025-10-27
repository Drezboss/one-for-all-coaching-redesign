import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, ChevronDown } from "lucide-react";
import { siteContent } from "@shared/content";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";

// Optimized Image Component with lazy loading
const OptimizedImage = memo(({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Preload critical images
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      )}
      <motion.img
        {...props}
        src={imageSrc}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export function HeroSection() {
  const handleScrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToExpectations = () => {
    const element = document.getElementById('expectations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section introducing One For All Coaching"
    >
      {/* Enhanced Background with Layered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-lfc-red/5 to-transparent" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      
      {/* Enhanced Image Section with Modern Overlay and Performance Optimization */}
      <div className="absolute top-0 right-0 w-1/2 h-full" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-br from-gray-800/60 to-gray-900/80 overflow-hidden relative">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <OptimizedImage
              src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
              alt="Dave Cornock - All Weather Professional Football Coach in action"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
        </div>
      </div>

      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Animated Brand Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-lfc-red/10 border border-lfc-red/20 backdrop-blur-sm mb-6"
            role="banner"
            aria-label="One For All Coaching brand badge"
          >
            <span className="w-2 h-2 bg-lfc-red rounded-full mr-3 animate-pulse" aria-hidden="true"></span>
            <span className="text-sm text-lfc-red font-semibold tracking-wider uppercase">
              {siteContent.site.name}
            </span>
          </motion.div>

          {/* Enhanced Main Heading with Staggered Animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black text-white leading-none mb-6 tracking-tight"
            role="heading"
            aria-level={1}
          >
            {siteContent.home.hero.title.split(' ').map((word, index) => 
              word === 'POTENTIAL' ? 
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-lfc-red inline-block"
                  aria-label="Potential - emphasized word"
                >
                  {word}
                </motion.span> : 
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="inline-block"
                >
                  {word}{index < siteContent.home.hero.title.split(' ').length - 1 ? ' ' : ''}
                </motion.span>
            )}
          </motion.h1>

          {/* Enhanced Subtitle with Modern Typography */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-2xl md:text-3xl font-bold text-white/90 mb-6 tracking-wide"
            role="heading"
            aria-level={2}
          >
            {siteContent.site.tagline.toUpperCase()}
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed font-light"
            role="text"
          >
            {siteContent.home.hero.subtitle}
          </motion.p>

          {/* Enhanced Quote with Modern Styling */}
          <motion.blockquote 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="relative pl-6 mb-10"
            role="blockquote"
            aria-label="Coach Dave Cornock's quote"
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-lfc-red to-bright-red rounded-full" aria-hidden="true"></div>
            <p className="text-xl md:text-2xl font-semibold text-lfc-red italic leading-relaxed">
              "{siteContent.coach.quote}"
            </p>
          </motion.blockquote>

          {/* Enhanced CTA Buttons with Modern Hover Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link href="/individual-coaching">
              <Button 
                className="group relative overflow-hidden bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-lfc-red/25 focus:ring-2 focus:ring-lfc-red focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Book individual coaching session"
              >
                <span className="relative z-10 flex items-center">
                  {siteContent.home.hero.primaryButton}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    →
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-bright-red to-lfc-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true"></div>
              </Button>
            </Link>
            
            <button
              onClick={handleScrollToServices}
              className="group relative border-2 border-white/50 text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-300 rounded-md backdrop-blur-sm hover:backdrop-blur-none hover:shadow-lg transform hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Learn more about our services - scroll to services section"
            >
              <span className="flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                {siteContent.home.hero.secondaryButton}
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        role="navigation"
        aria-label="Scroll to next section"
      >
        <motion.button
          onClick={handleScrollToExpectations}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
          aria-label="Scroll down to expectations section"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollToExpectations();
            }
          }}
        >
          <span className="text-sm font-medium mb-2 group-hover:text-lfc-red transition-colors duration-300">Scroll Down</span>
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}

// Memoized ExpectationSection for performance
export const ExpectationSection = memo(() => {
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

  return (
    <section 
      id="expectations" 
      className="py-20 bg-almost-black relative overflow-hidden"
      role="region"
      aria-labelledby="expectations-heading"
    >
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-lfc-red/5 to-transparent" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:20px_20px]" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lfc-red to-bright-red rounded-full mb-6 shadow-xl shadow-lfc-red/25"
            aria-hidden="true"
          >
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>
          <h2 
            id="expectations-heading"
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
            role="heading"
            aria-level={2}
          >
            WHAT TO EXPECT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-lfc-red to-bright-red mx-auto rounded-full" aria-hidden="true"></div>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Training expectations"
        >
          {expectations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Add any interaction needed
                }
              }}
            >
              {/* Modern Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm group-hover:border-lfc-red/30 transition-all duration-300 focus-within:border-lfc-red/50" aria-hidden="true"></div>
              <div className="relative p-8 text-center">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-lfc-red to-bright-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-lfc-red/25 group-hover:shadow-2xl group-hover:shadow-lfc-red/40 transition-all duration-300"
                  aria-hidden="true"
                >
                  <span className="text-2xl filter drop-shadow-sm" role="img" aria-label={`Icon for ${item.title}`}>{item.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lfc-red transition-colors duration-300" role="heading" aria-level={3}>
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
          role="region"
          aria-label="Journey commitment statement"
        >
          <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you're looking to improve your skills, aiming to stand out at grassroots level, or just want to play with more purpose — we're here to guide you.
          </p>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-lfc-red via-bright-red to-lfc-red bg-clip-text text-transparent tracking-wide"
              role="text"
              aria-label="Our commitment statement"
            >
              YOUR JOURNEY. YOUR STANDARD. YOUR BEST VERSION
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

ExpectationSection.displayName = 'ExpectationSection';
