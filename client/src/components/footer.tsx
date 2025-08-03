import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const services = [
    { name: "Individual Coaching", href: "/individual-coaching" },
    { name: "Group Sessions", href: "/group-sessions" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const quickLinks = [
    { name: "Book Now", href: "/contact" },
    { name: "Calendar", href: "/calendar" },
    { name: "Parent Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Trophy className="w-10 h-10 text-ne-yellow mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">ONE FOR ALL</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Coaching</div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Professional football coaching that brings out the best in every player.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ne-blue transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href}>
                    <a className="hover:text-ne-yellow transition-colors duration-200">
                      {service.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="hover:text-ne-yellow transition-colors duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:contact@oneforallcoaching.com" className="flex items-center hover:text-ne-yellow transition-colors duration-200">
                <Mail className="w-4 h-4 mr-2" />
                contact@oneforallcoaching.com
              </a>
              <a href="tel:+447123456789" className="flex items-center hover:text-ne-yellow transition-colors duration-200">
                <Phone className="w-4 h-4 mr-2" />
                +44 7123 456789
              </a>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>Liverpool, UK</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-ne-blue text-white placeholder-gray-500"
                />
                <Button 
                  type="submit"
                  className="bg-ne-yellow hover:bg-ne-yellow-light text-gray-900 font-semibold px-4 py-2"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ONE FOR ALL Coaching. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy">
                <a className="hover:text-ne-yellow transition-colors duration-200">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="hover:text-ne-yellow transition-colors duration-200">Terms of Service</a>
              </Link>
              <Link href="/gdpr">
                <a className="hover:text-ne-yellow transition-colors duration-200">GDPR</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
