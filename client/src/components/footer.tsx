import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trophy, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@shared/content";

export function Footer() {
  const services = [
    { name: "1-2-1 Coaching", href: "/individual-coaching" },
    { name: "Group Sessions", href: "/group-sessions" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Dave", href: "/about" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/contact" },
  ];

  const parentLinks = [
    { name: "Parent Login", href: "/login" },
    { name: "Create Account", href: "/register" },
    { name: "Parent Dashboard", href: "/parent-dashboard" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      href: siteContent.site.socialMedia.facebook, 
      icon: Facebook,
      label: "Follow us on Facebook"
    },
    { 
      name: "Twitter", 
      href: siteContent.site.socialMedia.twitter, 
      icon: Twitter,
      label: "Follow us on Twitter"
    },
    { 
      name: "Instagram", 
      href: siteContent.site.socialMedia.instagram, 
      icon: Instagram,
      label: "Follow us on Instagram"
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: siteContent.site.email,
      href: `mailto:${siteContent.site.email}`,
      label: "Email us"
    },
    {
      icon: Phone,
      text: siteContent.site.phone,
      href: `tel:${siteContent.site.phone}`,
      label: "Call us"
    },
    {
      icon: MapPin,
      text: "Gloucestershire, UK",
      label: "Our location"
    },
  ];

  return (
    <footer className="bg-card border-t border-border py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/" 
              className="flex items-center mb-6 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
              aria-label="One For All Coaching - Home"
            >
              <div className="text-2xl font-bold text-foreground">
                <Trophy className="inline-block w-7 h-7 text-primary mr-2 transition-colors duration-200 group-hover:text-primary/80" />
                ONE FOR ALL
                <span className="block text-lg text-muted-foreground font-normal group-hover:text-foreground transition-colors duration-200">
                  COACHING
                </span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {siteContent.site.tagline}. Professional football coaching that helps you unlock your potential.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center text-sm">
                  <contact.icon className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      aria-label={contact.label}
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{contact.text}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
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
            <h4 className="text-foreground font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:underline"
                  >
                    {service.name}
                  </Link>
                </li>
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
            <h4 className="text-foreground font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
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
            <h4 className="text-foreground font-bold text-lg mb-4">For Parents</h4>
            <ul className="space-y-3 mb-6" role="list">
              {parentLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">
                Track your child's progress and book sessions
              </p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm transition-all duration-200"
                  aria-label="Access parent dashboard"
                >
                  Parent Dashboard
                  <ExternalLink className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-border pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {siteContent.site.name}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => {
                  // Add privacy policy modal or link
                  console.log("Privacy Policy clicked");
                }}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:underline"
              >
                Privacy Policy
              </button>
              
              <button 
                onClick={() => {
                  // Add terms of service modal or link
                  console.log("Terms clicked");
                }}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:underline"
              >
                Terms of Service
              </button>
              
              <div className="text-muted-foreground text-xs">
                Made with ❤️ for football development
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
