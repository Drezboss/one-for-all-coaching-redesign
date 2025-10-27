import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield } from "lucide-react";
import { siteContent } from "@shared/content";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* What to Expect Section */}
      <ExpectationSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* About Section with improved semantics */}
      <section 
        id="about" 
        className="py-20 bg-almost-black"
        aria-labelledby="about-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <img 
                  src={siteContent.images.coach.celebration}
                  alt="Dave Cornock celebrating success with young football players on the training ground"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 
                id="about-heading"
                className="text-display text-white mb-6"
              >
                {siteContent.home.whyChoose.title}
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {siteContent.home.whyChoose.description}
              </p>

              <div className="space-y-6" role="list" aria-label="Why choose our coaching">
                {siteContent.home.whyChoose.features.map((feature, index) => {
                  const icons = [Medal, Users, Shield];
                  const Icon = icons[index];
                  return (
                    <div key={index} className="flex items-start" role="listitem">
                      <div 
                        className="w-6 h-6 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1"
                        aria-hidden="true"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button 
                    className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200 focus-ring"
                    aria-label="Learn more about Dave Cornock, your football coach"
                  >
                    Meet Your Coach
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
