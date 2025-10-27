import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield, ArrowRight } from "lucide-react";
import { siteContent } from "@shared/content";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {siteContent.home.whyChoose.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {siteContent.home.whyChoose.description}
              </p>

              <div className="space-y-6">
                {siteContent.home.whyChoose.features.map((feature, index) => {
                  const icons = [Medal, Users, Shield];
                  const Icon = icons[index];
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-ne-blue/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="w-6 h-6 text-ne-blue" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <Link href="/about">
                  <Button className="btn-primary bg-ne-blue hover:bg-ne-blue-dark text-white">
                    Meet Your Coach
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src={siteContent.images.coach.celebration}
                    alt="Dave Cornock - Celebrating Success with Players"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Accent element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-ne-yellow rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ne-blue to-ne-blue-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Your Game to the Next Level?
          </h2>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Join hundreds of players who have transformed their game with professional coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="btn-secondary bg-ne-yellow hover:bg-ne-yellow-light text-gray-900 px-8 py-6 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ne-blue px-8 py-6 text-lg">
                Check Availability
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
