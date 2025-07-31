import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@shared/content";

export function Footer() {
  const trainingCentres = [
    { name: "Chatham Training Centre", href: "/training-centres/chatham" },
    { name: "Eltham Training Centre", href: "/training-centres/eltham" },
    { name: "121 Training Sessions", href: "/training-centres/121-sessions" },
    { name: "Team Training", href: "/training-centres/team-training" },
    { name: "Goalkeeper Academy", href: "/training-centres/goalkeeper-academy" },
  ];

  const academy = [
    { name: "Apply Now", href: "/post-16-academy/apply" },
    { name: "Leigh Academy Halley", href: "/post-16-academy/leigh-academy" },
    { name: "The Victory Academy", href: "/post-16-academy/victory-academy" },
    { name: "Welling School", href: "/post-16-academy/welling-school" },
    { name: "Cray Wanderers FC", href: "/post-16-academy/cray-wanderers" },
  ];

  const about = [
    { name: "Harry Watling", href: "/about/harry-watling" },
    { name: "Success Stories", href: "/about/success-stories" },
    { name: "Our Partners", href: "/about/partners" },
    { name: "Testimonials", href: "/about/testimonials" },
    { name: "APD Kit Shop", href: "/kit-shop" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="text-3xl font-bold text-white">
                A.P.D
                <span className="block text-sm text-gray-400 font-normal">Advance Player Development</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {siteContent.site.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href={`tel:${siteContent.site.phone}`} className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                {siteContent.site.phone}
              </a>
              <a href={`mailto:${siteContent.site.email}`} className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                {siteContent.site.email}
              </a>
            </div>
            
            <div className="flex space-x-3">
              <a
                href={siteContent.site.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--apd-blue)] rounded-full flex items-center justify-center hover:bg-[var(--apd-light-blue)] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href={siteContent.site.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--apd-blue)] rounded-full flex items-center justify-center hover:bg-[var(--apd-light-blue)] transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href={siteContent.site.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--apd-blue)] rounded-full flex items-center justify-center hover:bg-[var(--apd-light-blue)] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href={siteContent.site.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--apd-blue)] rounded-full flex items-center justify-center hover:bg-[var(--apd-light-blue)] transition-colors duration-200"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Training Centres</h3>
            <ul className="space-y-2">
              {trainingCentres.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Post-16 Academy</h3>
            <ul className="space-y-2">
              {academy.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About APD</h3>
            <ul className="space-y-2">
              {about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {siteContent.site.name}. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms and Conditions</Link>
              {" | "}
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
