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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg' 
        : 'bg-card border-b border-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link href="/" className="flex items-center group">
            <div className="text-2xl lg:text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-200">
              <Trophy className="inline-block w-6 h-6 lg:w-8 lg:h-8 text-primary mr-2 group-hover:rotate-12 transition-transform duration-200" />
              ONE FOR ALL
              <span className="block text-sm lg:text-base text-muted-foreground font-normal">COACHING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`nav-link transition-all duration-200 font-medium ${
                    isActive(item.href)
                      ? "text-primary active"
                      : "text-muted-foreground hover:text-primary"
                  }`}
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
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-105"
                    >
                      {section.name}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
              
              <ThemeToggle />
              
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-200 hover:scale-105">
                  Parent Login
                </Button>
              </Link>
              
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button className="btn-primary">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:block lg:hidden">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button size="sm" className="btn-primary">
                  Book
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-md border-l border-gray-800 w-80">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold text-white">
                      <Trophy className="inline-block w-6 h-6 text-lfc-red mr-2" />
                      MENU
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Home page section links for mobile */}
                    {location === "/" && (
                      <>
                        <div className="border-t border-gray-700 my-4"></div>
                        <div className="px-4 text-sm text-gray-400 font-semibold mb-2">Quick Links:</div>
                        {homeSections.map((section) => (
                          <button
                            key={section.anchor}
                            onClick={() => handleAnchorClick(section.anchor)}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg"
                          >
                            → {section.name}
                          </button>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-gray-700 pt-6 space-y-4">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-gray-400">Theme:</span>
                      <ThemeToggle />
                    </div>
                    
                    <div className="space-y-3 px-4">
                      <Link href="/login" onClick={() => handleLinkClick("/login")}>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                          Parent Login
                        </Button>
                      </Link>
                      <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                        <Button className="w-full btn-primary">
                          Book Now
                        </Button>
                      </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="px-4 py-4 bg-gray-900/50 rounded-lg mx-4">
                      <p className="text-sm text-gray-400 mb-2">Need immediate help?</p>
                      <p className="text-white font-semibold">+44 7750 887112</p>
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
