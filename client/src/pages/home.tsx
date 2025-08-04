import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu, Send, User, Users, GraduationCap, X, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";
import { siteContent } from "@shared/content";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">One For All</h1>
              <span className="text-sm text-gray-600">Coaching</span>
            </div>
            <button 
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="px-4 py-2 space-y-1">
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                Services
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Mobile View */}
          <div className="space-y-6 lg:space-y-8">
            {/* Hero Section */}
            <section className="mobile-card text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Helping You Become the Best Version of Yourself
              </h2>
              <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300 font-medium px-6 py-3 rounded-lg transition-colors">
                Get Started
              </Button>
            </section>

            {/* About Me Section */}
            <section className="mobile-card">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                About Me - Dave Cornock
              </h3>
              <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-4">
                I'm Dave B Licensed Coach
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            {/* Contact Form Section */}
            <section className="mobile-card">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Contact Me</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mobile-form-input"
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mobile-form-input"
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    name="message"
                    placeholder="Message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mobile-form-input resize-none"
                    required
                  />
                </div>
                <div className="text-center pt-4">
                  <Button 
                    type="submit"
                    className="bg-gray-200 text-gray-900 hover:bg-gray-300 font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </section>

            {/* Contact Info */}
            <section className="mobile-card">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600 text-sm sm:text-base">{siteContent.site.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600 text-sm sm:text-base">{siteContent.site.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600 text-sm sm:text-base">Local Area</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Desktop View */}
          <div className="space-y-6 lg:space-y-8">
            {/* About Me Section */}
            <section className="mobile-card text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                About Me - Dave Cornock
              </h3>
              <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-4">
                UEFA B Licensed Coach
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            {/* Sessions Section */}
            <section className="mobile-card">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">1-2-1 Individual Program</p>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Group Sessions</p>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Coach Mentorship</p>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                      <div className="w-8 h-0.5 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-6">
                <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300 font-medium px-6 py-3 rounded-lg transition-colors">
                  Learn More
                </Button>
              </div>
            </section>

            {/* Footer */}
            <footer className="mobile-card">
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
                <Link href="/services" className="hover:text-gray-900 transition-colors">Services</Link>
                <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
