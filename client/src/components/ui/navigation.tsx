import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group" onClick={() => handleLinkClick("/")}>
            <div className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              <Trophy className="inline-block w-6 h-6 lg:w-8 lg:h-8 text-primary mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                ONE FOR ALL
              </span>
              <span className="block text-sm lg:text-base text-muted-foreground font-normal group-hover:text-primary transition-colors duration-300">
                COACHING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </Link>
              ))}
              
              {/* Home page section links */}
              {location === "/" && (
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border/50">
                  {homeSections.map((section) => (
                    <button
                      key={section.anchor}
                      onClick={() => handleAnchorClick(section.anchor)}
                      className="px-3 py-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md hover:bg-primary/5"
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border/50">
                <ThemeToggle />
                <Link href="/login" onClick={() => handleLinkClick("/login")}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-300 hover:shadow-md"
                  >
                    Parent Login
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                  <Button 
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="Open navigation menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-300" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-card/95 backdrop-blur-xl border-border/50"
              >
                <div className="flex flex-col h-full pt-8">
                  {/* Mobile menu header */}
                  <div className="mb-8">
                    <div className="text-2xl font-bold text-foreground">
                      <Trophy className="inline-block w-6 h-6 text-primary mr-2" />
                      <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        ONE FOR ALL
                      </span>
                      <span className="block text-sm text-muted-foreground font-normal">
                        COACHING
                      </span>
                    </div>
                  </div>

                  {/* Navigation links */}
                  <div className="flex-1 space-y-2">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`flex items-center px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.name}
                        {isActive(item.href) && (
                          <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </Link>
                    ))}
                    
                    {/* Home page section links for mobile */}
                    {location === "/" && (
                      <div className="pt-4 mt-4 border-t border-border/50">
                        <div className="text-sm text-muted-foreground font-semibold mb-3 px-4">
                          Quick Links
                        </div>
                        {homeSections.map((section, index) => (
                          <button
                            key={section.anchor}
                            onClick={() => handleAnchorClick(section.anchor)}
                            className="flex items-center w-full text-left px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:bg-primary/5 rounded-lg"
                            style={{ animationDelay: `${(navigation.length + index) * 50}ms` }}
                          >
                            <ChevronDown className="w-4 h-4 mr-2 -rotate-90" />
                            {section.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile menu footer */}
                  <div className="space-y-3 pt-6 border-t border-border/50">
                    <Link href="/login" onClick={() => handleLinkClick("/login")}>
                      <Button 
                        variant="outline" 
                        className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-300"
                      >
                        Parent Login
                      </Button>
                    </Link>
                    <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-300 hover:shadow-lg">
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
