import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigation = [
    { name: "Home", href: "/", ariaLabel: "Navigate to home page" },
    { name: "About Dave", href: "/about", ariaLabel: "Learn about Dave Cornock" },
    { name: "1-2-1 Coaching", href: "/individual-coaching", ariaLabel: "Individual coaching services" },
    { name: "Group Sessions", href: "/group-sessions", ariaLabel: "Group coaching sessions" },
    { name: "Contact", href: "/contact", ariaLabel: "Contact us or book a session" },
  ];

  // Quick section navigation for home page
  const homeSections = [
    { name: "Services", anchor: "services", ariaLabel: "Jump to services section" },
    { name: "About", anchor: "about", ariaLabel: "Jump to about section" },
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
    <nav 
      className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-300 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link 
            href="/" 
            className="flex items-center group transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="One For All Coaching - Home"
          >
            <div className="text-2xl font-bold text-foreground">
              <Trophy className="inline-block w-6 h-6 text-primary mr-2 transition-colors duration-200 group-hover:text-lfc-red" />
              ONE FOR ALL
              <span className="block text-sm text-muted-foreground font-normal group-hover:text-primary transition-colors duration-200">COACHING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  aria-label={item.ariaLabel}
                  className={`relative transition-all duration-200 font-medium px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
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
                      aria-label={section.ariaLabel}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {section.name}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
              
              <ThemeToggle />
              
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Parent login portal"
                >
                  Parent Login
                </Button>
              </Link>
              
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Book a coaching session"
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
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="bg-card border-border w-80"
                id="mobile-navigation"
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        aria-label={item.ariaLabel}
                        className={`block text-lg font-medium transition-all duration-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Home page section links for mobile */}
                  {location === "/" && (
                    <>
                      <div className="border-t border-border pt-4">
                        <div className="text-sm text-muted-foreground font-semibold mb-3 px-4">Quick Links:</div>
                        <div className="space-y-2">
                          {homeSections.map((section) => (
                            <button
                              key={section.anchor}
                              onClick={() => handleAnchorClick(section.anchor)}
                              aria-label={section.ariaLabel}
                              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              → {section.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Theme Toggle */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-muted-foreground font-medium">Theme:</span>
                      <ThemeToggle />
                    </div>
                  </div>
                  
                  {/* Mobile CTA Buttons */}
                  <div className="space-y-3 pt-4">
                    <Link href="/login" onClick={() => handleLinkClick("/login")}>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Parent login portal"
                      >
                        Parent Login
                      </Button>
                    </Link>
                    
                    <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                      <Button 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Book a coaching session"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
