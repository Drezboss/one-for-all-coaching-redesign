import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`border-b border-border sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-card/95 backdrop-blur-md shadow-lg' : 'bg-card'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              <Trophy className="inline-block w-6 h-6 text-primary mr-2 group-hover:scale-110 transition-transform duration-200" />
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
                  className={`relative transition-all duration-200 font-medium px-3 py-2 rounded-md ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              ))}
              {/* Home page section links */}
              {location === "/" && (
                <div className="flex items-center space-x-4 text-sm">
                  <div className="w-px h-4 bg-border"></div>
                  {homeSections.map((section) => (
                    <button
                      key={section.anchor}
                      onClick={() => handleAnchorClick(section.anchor)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1 rounded hover:bg-primary/5"
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              )}
              <div className="w-px h-4 bg-border"></div>
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-200">
                  Parent Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors duration-200">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold text-foreground">
                      <Trophy className="inline-block w-5 h-5 text-primary mr-2" />
                      Menu
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-primary"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Home page section links for mobile */}
                    {location === "/" && (
                      <>
                        <div className="border-t border-border my-4"></div>
                        <div className="px-4 text-sm text-muted-foreground font-semibold mb-2">Quick Links:</div>
                        {homeSections.map((section) => (
                          <button
                            key={section.anchor}
                            onClick={() => handleAnchorClick(section.anchor)}
                            className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
                          >
                            → {section.name}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                  
                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-muted-foreground">Theme:</span>
                      <ThemeToggle />
                    </div>
                    
                    <div className="space-y-2 px-4">
                      <Link href="/login" onClick={() => handleLinkClick("/login")}>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full">
                          Parent Login
                        </Button>
                      </Link>
                      <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full">
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
    </nav>
  );
}
