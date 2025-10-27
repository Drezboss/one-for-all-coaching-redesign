import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    { name: "Parent Dashboard", href: "/parent-dashboard" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: "#",
      color: "hover:bg-blue-600"
    },
    { 
      name: "Twitter", 
      icon: Twitter, 
      href: "#",
      color: "hover:bg-blue-400"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "#",
      color: "hover:bg-pink-600"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "#",
      color: "hover:bg-blue-700"
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-lfc-red/5 via-transparent to-lfc-red/5"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lfc-red to-transparent"></div>
      
      <div className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-6 group">
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  <Trophy className="inline-block w-8 h-8 lg:w-10 lg:h-10 text-lfc-red mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-lfc-red group-hover:to-bright-red transition-all duration-300">
                    ONE FOR ALL
                  </span>
                  <span className="block text-lg lg:text-xl text-gray-300 font-normal group-hover:text-lfc-red transition-colors duration-300">
                    COACHING
                  </span>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                Helping You Become the Best Version of Yourself through professional football coaching and development.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-400 hover:text-lfc-red transition-colors duration-300 group">
                  <Mail className="w-5 h-5 text-lfc-red group-hover:scale-110 transition-transform duration-300" />
                  <a href="mailto:info@oneforallcoaching.com" className="hover:text-lfc-red transition-colors duration-300">
                    info@oneforallcoaching.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-lfc-red transition-colors duration-300 group">
                  <Phone className="w-5 h-5 text-lfc-red group-hover:scale-110 transition-transform duration-300" />
                  <a href="tel:+447750887112" className="hover:text-lfc-red transition-colors duration-300">
                    +44 7750 887112
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group">
                  <MapPin className="w-5 h-5 text-lfc-red group-hover:scale-110 transition-transform duration-300" />
                  <span>Gloucestershire, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={`Follow us on ${social.name}`}
                    className={`w-12 h-12 bg-lfc-red rounded-2xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:rotate-3 group shadow-lg shadow-lfc-red/25`}
                  >
                    <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-xl mb-6 relative">
                Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-lfc-red"></div>
              </h4>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 text-lg group inline-flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-xl mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-lfc-red"></div>
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 text-lg group inline-flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parents Section */}
            <div>
              <h4 className="text-white font-bold text-xl mb-6 relative">
                For Parents
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-lfc-red"></div>
              </h4>
              <ul className="space-y-4 mb-6">
                {parentLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 text-lg group inline-flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Parent CTA */}
              <div className="glass p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-3">Track your child's progress</p>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-lfc-red/50 text-lfc-red hover:bg-lfc-red hover:text-white text-sm transition-all duration-300 hover:shadow-md"
                  >
                    Access Parent Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 pt-8 border-t border-gray-800/50">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get the latest training tips, coaching insights, and updates from One For All Coaching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-black/50 border border-gray-700/50 text-white px-4 py-3 rounded-lg focus:border-lfc-red focus:ring-lfc-red/20 transition-all duration-300"
                />
                <Button className="bg-lfc-red hover:bg-lfc-red/90 text-white font-semibold px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-lfc-red/25">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-center md:text-left">
              <p>
                © 2025 One For All Coaching. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-lfc-red transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-lfc-red transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-lfc-red transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-lfc-red hover:bg-lfc-red/90 text-white rounded-full flex items-center justify-center shadow-lg shadow-lfc-red/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </footer>
  );
}
