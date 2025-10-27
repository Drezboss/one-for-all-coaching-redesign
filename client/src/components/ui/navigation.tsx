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

  // Scroll detection for nav appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
    <nav className={cn(
      "bg-card border-b border-border sticky top-0 z-50 transition-all duration-300",
      isScrolled && "shadow-lg backdrop-blur-md bg-card/95"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-bold text-foreground transition-transform group-hover:scale-105">
              <Trophy className="inline-block w-6 h-6 text-primary mr-2 transition-colors group-hover:text-primary/80" />
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
                    "relative transition-all duration-200 font-medium py-2 px-1",
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
                    "after:bg-primary after:scale-x-0 after:transition-transform after:duration-300",
                    "hover:after:scale-x-100",
                    isActive(item.href)
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
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
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {section.name}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Parent Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
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
                  className="text-foreground hover:text-primary relative w-12 h-12"
                  aria-label="Open menu"
                >
                  <Menu className={cn(
                    "h-6 w-6 absolute transition-all duration-300",
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  )} />
                  <X className={cn(
                    "h-6 w-6 absolute transition-all duration-300",
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  )} />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-card border-border w-[85vw] sm:w-[400px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex flex-col space-y-2 mt-8">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={cn(
                        "text-lg font-medium transition-all duration-200 p-4 rounded-lg",
                        "flex items-center justify-between group",
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : ''
                      }}
                    >
                      {item.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
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
                  <div className="flex items-center justify-between mb-4 px-4">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <Link href="/login" onClick={() => handleLinkClick("/login")}>
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full mb-2 h-12"
                    >
                      Parent Login
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full h-12"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
