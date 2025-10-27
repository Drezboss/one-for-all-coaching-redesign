import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center mb-6 group">
                <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
                  <Trophy className="inline-block w-8 h-8 text-lfc-red mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  ONE FOR ALL
                  <span className="block text-lg text-gray-300 font-normal">COACHING</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Helping You Become the Best Version of Yourself through professional football coaching and development.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-lfc-red transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+44 7750 887112</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-lfc-red transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">dave@all-4one-coaching.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Swindon, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red hover:scale-110 transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-lfc-red mr-2" />
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-lfc-red group-hover:w-4 transition-all duration-200 mr-2"></span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-lfc-red mr-2" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-lfc-red group-hover:w-4 transition-all duration-200 mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parents Section */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-lfc-red mr-2" />
                Parents
              </h4>
              <ul className="space-y-3 mb-6">
                {parentLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-lfc-red group-hover:w-4 transition-all duration-200 mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="bg-almost-black rounded-lg border border-gray-700 p-4 hover:border-lfc-red transition-colors duration-200">
                <p className="text-sm text-gray-400 mb-3">Already registered?</p>
                <Link href="/login">
                  <Button variant="outline" className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm transition-all duration-200 hover:scale-105">
                    Access Parent Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 One For All Coaching. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200">
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="text-lfc-red hover:text-bright-red transition-colors duration-200 hover:scale-110"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
