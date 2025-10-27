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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-card border-b border-border'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <motion.div 
              className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trophy className="inline-block w-6 h-6 text-primary mr-2" />
              ONE FOR ALL
              <span className="block text-sm text-muted-foreground font-normal">COACHING</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`relative transition-colors duration-200 font-medium ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              
              {/* Home page section links */}
              {location === "/" && (
                <div className="flex items-center space-x-4 text-sm">
                  {homeSections.map((section) => (
                    <button
                      key={section.anchor}
                      onClick={() => handleAnchorClick(section.anchor)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
                    >
                      {section.name}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  ))}
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
              
              <ThemeToggle />
              
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-200"
                >
                  Parent Login
                </Button>
              </Link>
              
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Menu</h3>
                    <ThemeToggle />
                  </div>
                  
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`block text-lg font-medium transition-colors duration-200 py-2 px-3 rounded-lg ${
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
                  {location === "/" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="border-t border-border my-4"></div>
                      <div className="text-sm text-muted-foreground font-semibold mb-2 px-3">Quick Links:</div>
                      {homeSections.map((section, index) => (
                        <button
                          key={section.anchor}
                          onClick={() => handleAnchorClick(section.anchor)}
                          className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-muted"
                        >
                          → {section.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                  
                  <div className="border-t border-border my-4"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <Link href="/login" onClick={() => handleLinkClick("/login")}>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full"
                      >
                        Parent Login
                      </Button>
                    </Link>
                    <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                      <Button 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
