import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navigation = [
    { name: "Welcome", href: "/" },
    { 
      name: "About", 
      href: "/about",
      dropdown: [
        { name: "Harry Watling", href: "/about/harry-watling" },
        { name: "APD News", href: "/about/news" },
        { name: "Success Stories", href: "/about/success-stories" },
        { name: "Meet the Staff", href: "/about/staff" },
        { name: "Our Partners", href: "/about/partners" },
        { name: "Testimonials", href: "/about/testimonials" },
      ]
    },
    { 
      name: "Training Centres", 
      href: "/training-centres",
      dropdown: [
        { name: "Chatham Training Centre", href: "/training-centres/chatham" },
        { name: "Eltham Training Centre", href: "/training-centres/eltham" },
        { name: "Team Training", href: "/training-centres/team-training" },
        { name: "Goalkeeper Academy", href: "/training-centres/goalkeeper-academy" },
        { name: "121 Training Sessions", href: "/training-centres/121-sessions" },
        { name: "Loyalty Cards", href: "/training-centres/loyalty-cards" },
      ]
    },
    { 
      name: "Post-16 Football Academy", 
      href: "/post-16-academy",
      dropdown: [
        { name: "Apply to become an APD Scholar", href: "/post-16-academy/apply" },
        { name: "Leigh Academy Halley", href: "/post-16-academy/leigh-academy" },
        { name: "The Victory Academy", href: "/post-16-academy/victory-academy" },
        { name: "Welling School", href: "/post-16-academy/welling-school" },
        { name: "Cray Wanderers FC", href: "/post-16-academy/cray-wanderers" },
        { name: "Post-16 Tour 2022", href: "/post-16-academy/tour-2022" },
        { name: "Post-16 Tour 2020", href: "/post-16-academy/tour-2020" },
      ]
    },
    { name: "Holiday Camps", href: "/holiday-camps" },
    { name: "APD Kit Shop", href: "/kit-shop" },
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

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-foreground">
              A.P.D
              <span className="block text-sm text-muted-foreground font-normal">Advance Player Development</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className={`transition-colors duration-200 font-medium flex items-center gap-1 ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}>
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} onClick={() => handleLinkClick(subItem.href)}>
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`transition-colors duration-200 font-medium ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <ThemeToggle />
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`text-lg font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => handleLinkClick(subItem.href)}
                              className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="border-t border-border my-4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full">
                      Contact Us
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
