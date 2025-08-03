import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
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

  const socialMedia = [
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
      ariaLabel: "Connect with us on LinkedIn"
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "info@oneforallcoaching.com",
      href: "mailto:info@oneforallcoaching.com",
      label: "Send us an email"
    },
    {
      icon: Phone,
      text: "+44 XXX XXX XXXX",
      href: "tel:+44XXXXXXXXX",
      label: "Call us"
    },
    {
      icon: MapPin,
      text: "Liverpool, UK",
      href: "#",
      label: "View our location"
    },
  ];

  return (
    <footer 
      className="bg-black border-t border-gray-800 section-padding-sm"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link 
              href="/" 
              className="flex items-center mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md"
              aria-label="One For All Coaching - Go to homepage"
            >
              <div className="text-3xl font-bold text-white">
                <Trophy 
                  className="inline-block w-8 h-8 text-lfc-red mr-2" 
                  aria-hidden="true"
                />
                ONE FOR ALL
                <span className="block text-lg text-gray-300 font-normal">COACHING</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Helping You Become the Best Version of Yourself through professional football coaching and development.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md p-1 -m-1"
                    aria-label={contact.label}
                  >
                    <Icon className="w-4 h-4 mr-3" aria-hidden="true" />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                );
              })}
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md p-1 -m-1 block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Quick links navigation">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md p-1 -m-1 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Parents Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Parents</h3>
            <nav aria-label="Parent portal navigation">
              <ul className="space-y-2 mb-4">
                {parentLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md p-1 -m-1 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-4 p-4 bg-almost-black rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 mb-3">Already registered?</p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Access parent dashboard - login required"
                >
                  Access Parent Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 One For All Coaching. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
