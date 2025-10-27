import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield } from "lucide-react";
import { siteContent } from "@shared/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* About Section */}
      <section 
        id="about" 
        className="section-padding bg-almost-black"
        aria-labelledby="about-title"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <figure className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <OptimizedImage
                  src={siteContent.images.coach.celebration}
                  alt="Dave Cornock celebrating success with young players after a coaching session"
                  className="w-full h-full"
                  priority={false}
                  placeholder="blur"
                />
              </figure>
            </div>
            <div className="order-1 lg:order-2">
              <h2 
                id="about-title"
                className="text-4xl md:text-5xl font-black text-white mb-6 focus:outline-none"
                tabIndex={-1}
              >
                {siteContent.home.whyChoose.title}
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {siteContent.home.whyChoose.description}
              </p>

              <div 
                className="space-y-6"
                role="list"
                aria-label="Coaching features and benefits"
              >
                {siteContent.home.whyChoose.features.map((feature, index) => {
                  const icons = [Medal, Users, Shield];
                  const Icon = icons[index];
                  return (
                    <div 
                      key={index} 
                      className="flex items-start animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                      role="listitem"
                    >
                      <div 
                        className="w-6 h-6 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="bg-lfc-red text-white hover:bg-bright-red font-bold transform hover:-translate-y-0.5 transition-all duration-200"
                    aria-label="Learn more about Dave Cornock, your coach"
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
