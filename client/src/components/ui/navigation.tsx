import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scroll effect for navigation
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
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-lg border-b border-border shadow-lg" : "bg-card border-b border-border"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <motion.div 
              className="text-2xl font-bold text-foreground flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Trophy className="inline-block w-6 h-6 text-primary mr-2 group-hover:rotate-12 transition-transform duration-200" />
              <div>
                ONE FOR ALL
                <span className="block text-sm text-muted-foreground font-normal">COACHING</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "transition-colors duration-200 font-medium py-2",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                  {/* Animated underline */}
                  <AnimatePresence>
                    {(isActive(item.href) || hoveredItem === item.name) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {/* Home page section links */}
              {location === "/" && (
                <div className="flex items-center space-x-4 text-sm">
                  {homeSections.map((section) => (
                    <motion.button
                      key={section.anchor}
                      onClick={() => handleAnchorClick(section.anchor)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.name}
                    </motion.button>
                  ))}
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                  size="sm"
                >
                  Parent Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-primary"
                  size="sm"
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
                  className="text-foreground hover:text-primary"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border">
                <motion.div 
                  className="flex flex-col space-y-4 mt-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                >
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
                        className={cn(
                          "text-lg font-medium transition-colors duration-200 block py-2",
                          isActive(item.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Home page section links for mobile */}
                  {location === "/" && (
                    <>
                      <div className="border-t border-border my-4"></div>
                      <div className="text-sm text-muted-foreground font-semibold mb-2">Quick Links:</div>
                      {homeSections.map((section) => (
                        <button
                          key={section.anchor}
                          onClick={() => handleAnchorClick(section.anchor)}
                          className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
                        >
                          → {section.name}
                        </button>
                      ))}
                    </>
                  )}
                  
                  <div className="border-t border-border my-4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <Link href="/login" onClick={() => handleLinkClick("/login")}>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full mb-2">
                      Parent Login
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full">
                      Book Now
                    </Button>
                  </Link>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
