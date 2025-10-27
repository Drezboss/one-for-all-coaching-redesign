import { Link } from "wouter";
import { Trophy, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

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

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-lfc-red via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-1"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center mb-6 group">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Trophy className="w-10 h-10 text-primary" />
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full opacity-20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-white">
                    <span className="text-gradient">ONE FOR ALL</span>
                    <span className="block text-sm lg:text-base text-gray-300 font-normal">COACHING</span>
                  </div>
                </motion.div>
              </Link>
              
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Helping You Become the Best Version of Yourself through professional football coaching and development.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-lfc-red transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+44 7750 887112</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-lfc-red transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">dave@all-4one-coaching.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-lfc-red transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Liverpool, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gradient-to-br from-lfc-red to-bright-red rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Star className="w-5 h-5 text-lfc-red mr-2" />
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Star className="w-5 h-5 text-lfc-red mr-2" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Parents Section */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <Star className="w-5 h-5 text-lfc-red mr-2" />
                Parents
              </h4>
              <ul className="space-y-3 mb-6">
                {parentLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lfc-red transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <motion.div 
                className="p-4 bg-gradient-to-br from-lfc-red/10 to-bright-red/10 rounded-xl border border-lfc-red/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-300 mb-3 font-medium">Already registered?</p>
                <Link href="/login">
                  <Button className="w-full btn-primary text-sm">
                    Access Parent Dashboard
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="py-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest coaching tips and updates</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lfc-red focus:border-transparent"
              />
              <Button className="btn-primary whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 py-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 One For All Coaching. All rights reserved. |{" "}
            <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-300 hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-300 hover:underline">
              Terms of Service
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            UEFA B License qualified • DBS checked • First Aid certified
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
