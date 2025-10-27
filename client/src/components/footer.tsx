import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const services = [
    { name: "1-2-1 Coaching", href: "/individual-coaching" },
    { name: "Group Sessions", href: "/group-sessions" },
    { name: "Coach Education", href: "/about" },
    { name: "Coach Mentorship", href: "/about" },
  ];

  const quickLinks = [
    { name: "About Dave", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book Now", href: "/contact" },
  ];

  const parentLinks = [
    { name: "Parent Login", href: "/login" },
    { name: "Create Account", href: "/register" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black to-almost-black border-t border-gray-800 pt-16 pb-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6 group">
              <div className="text-3xl font-bold text-white transition-transform duration-300 group-hover:scale-105">
                <Trophy className="inline-block w-8 h-8 text-lfc-red mr-2 transition-transform duration-300 group-hover:rotate-12" />
                ONE FOR ALL
                <span className="block text-lg text-gray-300 font-normal">COACHING</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Helping You Become the Best Version of Yourself through professional football coaching and development.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={cn(
                      "w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center",
                      "hover:bg-lfc-red transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-lfc-red/20",
                      "border border-gray-800 hover:border-lfc-red"
                    )}
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-8 h-px bg-lfc-red mr-3"></div>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-8 h-px bg-lfc-red mr-3"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a 
                href="mailto:info@oneforallcoaching.com" 
                className="flex items-center text-gray-400 hover:text-lfc-red transition-colors duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@oneforallcoaching.com</span>
              </a>
              <a 
                href="tel:+44123456789" 
                className="flex items-center text-gray-400 hover:text-lfc-red transition-colors duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+44 123 456 789</span>
              </a>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span className="text-sm">Liverpool, UK</span>
              </div>
            </div>
          </div>

          {/* Parents */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-8 h-px bg-lfc-red mr-3"></div>
              Parents
            </h4>
            <ul className="space-y-3 mb-6">
              {parentLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="p-6 bg-gradient-to-br from-gray-900 to-almost-black rounded-xl border border-gray-800 hover:border-lfc-red/50 transition-all duration-300 hover:shadow-lg hover:shadow-lfc-red/10">
              <p className="text-sm text-gray-400 mb-3">Already registered?</p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm transition-all duration-300 hover:scale-105"
                >
                  Access Parent Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} One For All Coaching. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-lfc-red transition-colors duration-300 hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a 
                href="#" 
                className="text-gray-400 hover:text-lfc-red transition-colors duration-300 hover:underline underline-offset-4"
              >
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a 
                href="#" 
                className="text-gray-400 hover:text-lfc-red transition-colors duration-300 hover:underline underline-offset-4"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 opacity-50">
            <div className="text-xs text-gray-500 flex items-center">
              <span className="mr-2">🔒</span>
              SSL Secured
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="mr-2">✓</span>
              FA Certified Coach
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="mr-2">🛡️</span>
              DBS Checked
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
