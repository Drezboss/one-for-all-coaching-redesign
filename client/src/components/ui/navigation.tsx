import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full opacity-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-xl lg:text-2xl font-black text-foreground">
                <span className="text-gradient">ONE FOR ALL</span>
                <span className="block text-xs lg:text-sm text-muted-foreground font-normal">COACHING</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {/* Main Navigation Links */}
              <div className="flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`nav-link relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Home page section links */}
              <AnimatePresence>
                {location === "/" && (
                  <motion.div 
                    className="flex items-center space-x-4 text-sm border-l border-border pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {homeSections.map((section) => (
                      <button
                        key={section.anchor}
                        onClick={() => handleAnchorClick(section.anchor)}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1 group"
                      >
                        <span>{section.name}</span>
                        <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/login" onClick={() => handleLinkClick("/login")}>
                  <Button 
                    variant="outline" 
                    className="btn-secondary border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                  >
                    Parent Login
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                  <Button className="btn-primary font-semibold">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground hover:text-primary relative"
                  aria-label="Open navigation menu"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-background/95 backdrop-blur-md border-border w-80"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 mb-8 pt-4">
                    <Trophy className="w-8 h-8 text-primary" />
                    <div className="text-xl font-black">
                      <span className="text-gradient">ONE FOR ALL</span>
                      <span className="block text-sm text-muted-foreground font-normal">COACHING</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 space-y-2">
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
                          className={`block px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg ${
                            isActive(item.href)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-muted"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Home page section links for mobile */}
                    <AnimatePresence>
                      {location === "/" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t border-border my-4 pt-4">
                            <div className="text-sm text-muted-foreground font-semibold mb-3 px-4">
                              Quick Links:
                            </div>
                            {homeSections.map((section, index) => (
                              <motion.button
                                key={section.anchor}
                                onClick={() => handleAnchorClick(section.anchor)}
                                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <span>→</span>
                                <span>{section.name}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Actions */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-muted-foreground">Theme:</span>
                      <ThemeToggle />
                    </div>
                    
                    <div className="space-y-3 px-4">
                      <Link href="/login" onClick={() => handleLinkClick("/login")}>
                        <Button 
                          variant="outline" 
                          className="btn-secondary border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full"
                        >
                          Parent Login
                        </Button>
                      </Link>
                      <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                        <Button className="btn-primary font-semibold w-full">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
