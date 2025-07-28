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

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="text-3xl font-bold text-white">
                <Trophy className="inline-block w-8 h-8 text-lfc-red mr-2" />
                ONE FOR ALL
                <span className="block text-lg text-gray-300 font-normal">COACHING</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Helping You Become the Best Version of Yourself through professional football coaching and development.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center hover:bg-bright-red transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Parents</h4>
            <ul className="space-y-2">
              {parentLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lfc-red transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-almost-black rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Already registered?</p>
              <Link href="/login">
                <Button variant="outline" className="w-full border-lfc-red text-lfc-red hover:bg-lfc-red hover:text-white text-sm">
                  Access Parent Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 One For All Coaching. All rights reserved. |{" "}
            <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="text-lfc-red hover:text-bright-red transition-colors duration-200">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
