import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Add scroll effect to navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Individual Coaching", href: "/individual-coaching" },
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
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
              <Trophy className="w-10 h-10 text-ne-blue transition-transform group-hover:scale-110" />
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-900">ONE FOR ALL</span>
                <span className="block text-xs text-gray-600 uppercase tracking-wider">Coaching</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  onClick={() => handleLinkClick(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-ne-blue bg-ne-gray-light"
                      : "text-gray-700 hover:text-ne-blue hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}

            <div className="ml-6 flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/contact">
                <Button className="btn-primary bg-ne-blue hover:bg-ne-blue-dark text-white">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col space-y-1 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        onClick={() => handleLinkClick(item.href)}
                        className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-ne-blue bg-ne-gray-light"
                            : "text-gray-700 hover:text-ne-blue hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}

                  <div className="pt-6 border-t">
                    <Link href="/contact">
                      <Button 
                        onClick={() => setIsOpen(false)}
                        className="w-full btn-primary bg-ne-blue hover:bg-ne-blue-dark text-white"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>

                  {/* Parent portal links for mobile */}
                  <div className="pt-4 space-y-2">
                    <Link href="/login">
                      <a
                        onClick={() => handleLinkClick("/login")}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-ne-blue"
                      >
                        Parent Login
                      </a>
                    </Link>
                    <Link href="/register">
                      <a
                        onClick={() => handleLinkClick("/register")}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-ne-blue"
                      >
                        Create Account
                      </a>
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
