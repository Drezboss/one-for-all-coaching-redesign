import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(355, 87%, 48%) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(355, 87%, 48%) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center mb-6 group">
                <motion.div 
                  className="text-3xl font-bold text-white group-hover:text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="inline-block w-8 h-8 text-lfc-red mr-2" />
                  ONE FOR ALL
                  <span className="block text-lg text-gray-300 font-normal">COACHING</span>
                </motion.div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Helping You Become the Best Version of Yourself through professional football coaching and development.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-3 text-lfc-red" />
                  <span className="text-sm">+44 7750 887112</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-3 text-lfc-red" />
                  <span className="text-sm">dave@all-4one-coaching.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 text-lfc-red" />
                  <span className="text-sm">Liverpool, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-all duration-200 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-lfc-red mr-3"></span>
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li 
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-lfc-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {service.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-lfc-red mr-3"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-lfc-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Parents Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-lfc-red mr-3"></span>
                Parents
              </h4>
              <ul className="space-y-3 mb-6">
                {parentLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-lfc-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                className="p-4 bg-almost-black rounded-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-gray-400 mb-3">Already registered?</p>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm transition-all duration-200"
                  >
                    Access Parent Dashboard
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-gray-800 py-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 One For All Coaching. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
