import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <Trophy className="inline-block w-6 h-6 text-lfc-red mr-2" />
              ONE FOR ALL
              <span className="block text-sm text-gray-600 dark:text-gray-300 font-normal">COACHING</span>
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
                  className={`transition-colors duration-200 font-medium ${
                    isActive(item.href)
                      ? "text-lfc-red"
                      : "text-gray-700 dark:text-gray-300 hover:text-lfc-red dark:hover:text-lfc-red"
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
                      className="text-gray-700 dark:text-gray-300 hover:text-lfc-red dark:hover:text-lfc-red transition-colors duration-200"
                    >
                      {section.name}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                </div>
              )}
              <ThemeToggle />
              <Link href="/login" onClick={() => handleLinkClick("/login")}>
                <Button variant="outline" className="border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white font-semibold">
                  Parent Login
                </Button>
              </Link>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button className="bg-lfc-red text-white hover:bg-bright-red font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-white hover:text-lfc-red">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-lfc-red"
                          : "text-gray-700 dark:text-gray-300 hover:text-lfc-red"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Home page section links for mobile */}
                  {location === "/" && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">Quick Links:</div>
                      {homeSections.map((section) => (
                        <button
                          key={section.anchor}
                          onClick={() => handleAnchorClick(section.anchor)}
                          className="text-left text-gray-700 dark:text-gray-300 hover:text-lfc-red transition-colors duration-200 py-1"
                        >
                          → {section.name}
                        </button>
                      ))}
                    </>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <Link href="/login" onClick={() => handleLinkClick("/login")}>
                    <Button variant="outline" className="border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white font-semibold w-full mb-2">
                      Parent Login
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                    <Button className="bg-lfc-red text-white hover:bg-bright-red font-semibold w-full shadow-lg">
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
