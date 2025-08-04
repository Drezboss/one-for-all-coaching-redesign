import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Dave", href: "/about" },
    { name: "1-2-1 Coaching", href: "/individual-coaching" },
    { name: "Group Sessions", href: "/group-sessions" },
    { name: "Contact", href: "/contact" },
  ];

  // Quick section navigation for home page
  const homeSections = [
    { name: "Services", anchor: "services" },
    { name: "About", anchor: "about" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    // Close mobile menu and scroll to top will be handled by useEffect
  };

  const handleAnchorClick = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isScrolled ? "bg-lfc-red/10" : "bg-white/10"
                } backdrop-blur-sm`}
              >
                <Trophy className="w-6 h-6 text-lfc-red" />
              </motion.div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white group-hover:text-lfc-red transition-colors duration-300">
                  ONE FOR ALL
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-wider">
                  COACHING
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                      isActive(item.href)
                        ? "text-lfc-red bg-lfc-red/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-lfc-red/10 rounded-lg border border-lfc-red/20"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Home page section links */}
              {location === "/" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/10"
                >
                  {homeSections.map((section) => (
                    <button
                      key={section.anchor}
                      onClick={() => handleAnchorClick(section.anchor)}
                      className="px-3 py-1 text-sm text-gray-400 hover:text-lfc-red transition-colors duration-300 rounded-md hover:bg-white/5"
                    >
                      {section.name}
                    </button>
                  ))}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/10"
              >
                <ThemeToggle />
                
                <Link href="/login" onClick={() => handleLinkClick("/login")}>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white hover:text-black font-medium transition-all duration-300 hover:scale-105"
                  >
                    Parent Login
                  </Button>
                </Link>
                
                <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                  <Button className="bg-lfc-red text-white hover:bg-bright-red font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lfc-red/25">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isScrolled ? "bg-white/10" : "bg-white/5"
                  } backdrop-blur-sm`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? (
                        <X className="h-6 w-6 text-white" />
                      ) : (
                        <Menu className="h-6 w-6 text-white" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="bg-black/95 backdrop-blur-xl border-l border-white/10 w-80"
              >
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-6 mt-8"
                >
                  {/* Mobile Logo */}
                  <div className="flex items-center pb-6 border-b border-white/10">
                    <div className="p-3 bg-lfc-red/10 rounded-xl">
                      <Trophy className="w-6 h-6 text-lfc-red" />
                    </div>
                    <div className="ml-3">
                      <div className="text-lg font-bold text-white">ONE FOR ALL</div>
                      <div className="text-xs text-gray-400 font-medium">COACHING</div>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => handleLinkClick(item.href)}
                          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                            isActive(item.href)
                              ? "text-lfc-red bg-lfc-red/10 border border-lfc-red/20"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></span>
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Home page section links for mobile */}
                  {location === "/" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="pt-4 border-t border-white/10"
                    >
                      <div className="text-sm text-gray-400 font-medium mb-3 px-4">Quick Links</div>
                      <div className="space-y-1">
                        {homeSections.map((section) => (
                          <button
                            key={section.anchor}
                            onClick={() => handleAnchorClick(section.anchor)}
                            className="flex items-center w-full px-4 py-2 text-left text-gray-400 hover:text-lfc-red transition-colors duration-300 rounded-lg hover:bg-white/5"
                          >
                            <span className="mr-3">→</span>
                            {section.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Mobile Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="pt-6 border-t border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-gray-400 font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                    
                    <div className="space-y-3">
                      <Link href="/login" onClick={() => handleLinkClick("/login")}>
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20 text-white hover:bg-white hover:text-black font-medium"
                        >
                          Parent Login
                        </Button>
                      </Link>
                      
                      <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                        <Button className="w-full bg-lfc-red text-white hover:bg-bright-red font-medium shadow-lg shadow-lfc-red/25">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
