import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "#", 
      icon: Facebook,
      ariaLabel: "Follow us on Facebook"
    },
    { 
      name: "Twitter", 
      href: "#", 
      icon: Twitter,
      ariaLabel: "Follow us on Twitter"
    },
    { 
      name: "Instagram", 
      href: "#", 
      icon: Instagram,
      ariaLabel: "Follow us on Instagram"
    },
    { 
      name: "LinkedIn", 
      href: "#", 
      icon: Linkedin,
      ariaLabel: "Follow us on LinkedIn"
    },
  ];

  return (
    <footer 
      className="bg-black border-t border-gray-800 py-12"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4" aria-label="Go to homepage">
              <div className="text-3xl font-bold text-white">
                <Trophy className="inline-block w-8 h-8 text-lfc-red mr-2" aria-hidden="true" />
                <span>ONE FOR ALL</span>
                <span className="block text-lg text-gray-300 font-normal">COACHING</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Helping You Become the Best Version of Yourself through professional football coaching and development.
            </p>
            
            {/* Social Links */}
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Services Links */}
          <nav aria-labelledby="services-heading">
            <h3 id="services-heading" className="text-white font-bold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-2" role="list">
              {services.map((service) => (
                <li key={service.name} role="listitem">
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-labelledby="quick-links-heading">
            <h3 id="quick-links-heading" className="text-white font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Parent Links */}
          <nav aria-labelledby="parents-heading">
            <h3 id="parents-heading" className="text-white font-bold text-lg mb-4">
              Parents
            </h3>
            <ul className="space-y-2 mb-4" role="list">
              {parentLinks.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="p-3 bg-almost-black rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Already registered?</p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Access parent dashboard"
                >
                  Access Parent Dashboard
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 One For All Coaching. All rights reserved. |{" "}
            <a 
              href="#" 
              className="text-lfc-red hover:text-bright-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a 
              href="#" 
              className="text-lfc-red hover:text-bright-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
