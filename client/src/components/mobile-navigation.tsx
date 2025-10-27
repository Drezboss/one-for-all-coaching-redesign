import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Trophy, Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Mobile Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-xl font-bold text-white">
                <Trophy className="inline-block w-6 h-6 text-lfc-red mr-2" />
                ONE FOR ALL
                <span className="block text-sm text-gray-300 font-normal">COACHING</span>
              </div>
            </Link>

            {/* Right Side - Theme Toggle and Menu Button */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              
              {/* Quick Call Button */}
              <a
                href="tel:+447750887112"
                className="hidden sm:flex items-center bg-lfc-red text-white hover:bg-bright-red px-3 py-2 rounded-md text-sm font-semibold transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </a>

              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:bg-gray-800 min-h-[44px] min-w-[44px]"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
              {/* Navigation Links */}
              <nav className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-3 px-4 rounded-md text-lg font-semibold transition-colors ${
                      location === item.href
                        ? 'bg-lfc-red text-white'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="space-y-3">
                <a
                  href="tel:+447750887112"
                  className="flex items-center justify-center w-full bg-lfc-red text-white hover:bg-bright-red py-3 px-4 rounded-md font-semibold transition-colors min-h-[44px]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +44 7750 887112
                </a>
                
                <Link href="/contact">
                  <Button className="w-full border-2 border-white text-white hover:bg-white hover:text-black py-3 font-semibold transition-colors min-h-[44px]">
                    Book Session
                  </Button>
                </Link>

                <Link href="/login">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 py-3 font-semibold transition-colors min-h-[44px]">
                    Parent Login
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-center space-y-2">
                  <p className="text-gray-400 text-sm">Get in touch:</p>
                  <a 
                    href="mailto:dave@all-4one-coaching.com"
                    className="block text-lfc-red hover:text-bright-red transition-colors text-sm"
                  >
                    dave@all-4one-coaching.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16"></div>
    </>
  );
}