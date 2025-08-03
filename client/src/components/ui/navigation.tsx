import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

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
      // Focus the element for screen readers
      element.focus();
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className="bg-card border-b border-border sticky top-0 z-50 transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" aria-label="Go to homepage">
            <div className="text-2xl font-bold text-foreground">
              <Trophy className="inline-block w-6 h-6 text-primary mr-2" aria-hidden="true" />
              <span>ONE FOR ALL</span>
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
                  className={`transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
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
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label={`Jump to ${section.name} section`}
                    >
                      {section.name}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-border" aria-hidden="true"></div>
                </div>
              )}
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Parent Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                  className="text-foreground hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open mobile menu"
                  aria-expanded={isOpen}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-card border-border"
                ref={mobileMenuRef}
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      ref={index === 0 ? firstMenuItemRef : undefined}
                      className={`text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-2 ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Home page section links for mobile */}
                  {location === "/" && (
                    <>
                      <div className="border-t border-border my-4" aria-hidden="true"></div>
                      <div className="text-sm text-muted-foreground font-semibold mb-2">Quick Links:</div>
                      {homeSections.map((section) => (
                        <button
                          key={section.anchor}
                          onClick={() => handleAnchorClick(section.anchor)}
                          className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          aria-label={`Jump to ${section.name} section`}
                        >
                          → {section.name}
                        </button>
                      ))}
                    </>
                  )}
                  
                  <div className="border-t border-border my-4" aria-hidden="true"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <Link href="/login" onClick={() => handleLinkClick("/login")}>
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full mb-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Parent Login
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
