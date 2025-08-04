import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileFooter() {
  const quickLinks = [
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="text-2xl font-bold text-white">
              <Trophy className="inline-block w-6 h-6 text-lfc-red mr-2" />
              ONE FOR ALL
              <span className="block text-base text-gray-300 font-normal">COACHING</span>
            </div>
          </Link>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Helping You Become the Best Version of Yourself through professional football coaching and development.
          </p>
        </div>

        {/* Quick Links - Centered */}
        <div className="text-center mb-8">
          <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-lfc-red transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-8">
          <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
          <div className="space-y-2">
            <a 
              href="tel:+447750887112"
              className="flex items-center justify-center text-gray-400 hover:text-lfc-red transition-colors duration-200 text-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              +44 7750 887112
            </a>
            <a 
              href="mailto:dave@all-4one-coaching.com"
              className="flex items-center justify-center text-gray-400 hover:text-lfc-red transition-colors duration-200 text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              dave@all-4one-coaching.com
            </a>
          </div>
        </div>

        {/* Social Media Icons - In a Row */}
        <div className="text-center mb-8">
          <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Parent Dashboard Access */}
        <div className="text-center mb-8">
          <div className="p-4 bg-almost-black rounded-lg border border-gray-700 max-w-sm mx-auto">
            <p className="text-sm text-gray-400 mb-3">Already registered?</p>
            <Link href="/login">
              <Button variant="outline" className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm py-2">
                Access Parent Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2025 One For All Coaching. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}