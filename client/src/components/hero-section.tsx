import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, Star } from "lucide-react";
import { siteContent } from "@shared/content";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-ne-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ne-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-ne-yellow/20 text-ne-blue rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 mr-2" />
                Professional Football Coaching
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Unlock Your
                <span className="text-ne-blue block">Full Potential</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {siteContent.home.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="btn-primary bg-ne-blue hover:bg-ne-blue-dark text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/calendar">
                <Button variant="outline" className="border-2 border-gray-300 hover:border-ne-blue text-gray-700 hover:text-ne-blue px-8 py-6 text-lg rounded-xl transition-all duration-200">
                  <Calendar className="mr-2 w-5 h-5" />
                  View Schedule
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Players Coached</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">5★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={siteContent.images.coach.hero}
                alt="Professional Football Coaching"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ne-blue/20 to-transparent"></div>
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-ne-yellow p-6 rounded-xl shadow-xl">
              <div className="text-2xl font-bold text-gray-900">UEFA Qualified</div>
              <div className="text-sm text-gray-700">Professional Coach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExpectationSection() {
  return (
    <section className="py-20 bg-ne-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What to Expect
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your journey to excellence starts with a comprehensive approach to football development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteContent.home.expectations.items.map((item, index) => (
            <div
              key={index}
              className="modern-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-ne-blue/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-ne-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
