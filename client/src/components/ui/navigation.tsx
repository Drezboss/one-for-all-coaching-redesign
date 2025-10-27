import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Enhanced scroll detection with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Throttle scroll events for better performance
    let rafId: number;
    const throttledScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = 0;
      });
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isScrolled]);

  // Smooth scroll to top with loading indication
  useEffect(() => {
    setIsNavigating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
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
    setIsNavigating(true);
  };

  const handleAnchorClick = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Loading bar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-1 bg-lfc-red z-[60] transition-all duration-300",
          isNavigating ? "w-full" : "w-0"
        )}
      />
      
      <nav className={cn(
        "bg-card border-b border-border sticky top-0 z-50 transition-all duration-300",
        isScrolled && "shadow-lg backdrop-blur-md bg-card/95"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <div className="text-2xl font-bold text-foreground transition-transform duration-300 group-hover:scale-105">
                <Trophy className="inline-block w-6 h-6 text-primary mr-2 transition-transform duration-300 group-hover:rotate-12" />
                ONE FOR ALL
                <span className="block text-sm text-muted-foreground font-normal">COACHING</span>
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
                    className={cn(
                      "relative transition-all duration-300 font-medium py-2",
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
                      "hover:after:w-full hover:text-primary",
                      isActive(item.href) 
                        ? "text-primary after:w-full" 
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Home page section links */}
                {location === "/" && (
                  <div className="flex items-center space-x-4 text-sm">
                    {homeSections.map((section) => (
                      <button
                        key={section.anchor}
                        onClick={() => handleAnchorClick(section.anchor)}
                        className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
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
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Parent Login
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-foreground hover:text-primary transition-all duration-300"
                    aria-label="Open menu"
                  >
                    <Menu className={cn(
                      "h-6 w-6 transition-transform duration-300",
                      isOpen && "rotate-90"
                    )} />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="bg-card border-border w-[300px] sm:w-[400px]"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-transparent"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col space-y-1">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={cn(
                          "text-lg font-medium transition-all duration-300 p-3 rounded-lg",
                          "hover:bg-accent hover:translate-x-2",
                          isActive(item.href)
                            ? "text-primary bg-accent/50"
                            : "text-muted-foreground"
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Home page section links for mobile */}
                    {location === "/" && (
                      <>
                        <div className="border-t border-border my-4"></div>
                        <div className="text-sm text-muted-foreground font-semibold mb-2 px-3">Quick Links:</div>
                        {homeSections.map((section, index) => (
                          <button
                            key={section.anchor}
                            onClick={() => handleAnchorClick(section.anchor)}
                            className="text-left text-muted-foreground hover:text-primary transition-all duration-300 p-3 rounded-lg hover:bg-accent hover:translate-x-2"
                            style={{
                              animationDelay: `${(navigation.length + index) * 50}ms`
                            }}
                          >
                            → {section.name}
                          </button>
                        ))}
                      </>
                    )}
                    
                    <div className="border-t border-border my-4"></div>
                    
                    <Link href="/login" onClick={() => handleLinkClick("/login")}>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full mb-2 transition-all duration-300 hover:scale-105"
                      >
                        Parent Login
                      </Button>
                    </Link>
                    <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                      <Button 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full transition-all duration-300 hover:scale-105"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
