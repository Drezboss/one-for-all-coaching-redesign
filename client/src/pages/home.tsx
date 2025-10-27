import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield } from "lucide-react";
import { useSiteInfo, useHomeContent } from "@/hooks/useContent";
import { ContentLoader } from "@/components/ui/content-loader";


export default function Home() {
  const siteInfo = useSiteInfo();
  const homeContent = useHomeContent();

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* About Section */}
      <section id="about" className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <img 
                  src={siteInfo.data?.images.coach.celebration || "/attached_assets/3-0 goals Coach Dave_1753424086963.jpg"}
                  alt="Dave Cornock - Celebrating Success with Players"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <ContentLoader
                loading={homeContent.loading}
                error={homeContent.error}
                onRetry={homeContent.reload}
                loadingMessage="Loading page content..."
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  {homeContent.data?.whyChoose.title}
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  {homeContent.data?.whyChoose.description}
                </p>

                <div className="space-y-6">
                  {homeContent.data?.whyChoose.features.map((feature, index) => {
                    const icons = [Medal, Users, Shield];
                    const Icon = icons[index];
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                          <p className="text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <Link href="/about">
                    <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200">
                      Meet Your Coach
                    </Button>
                  </Link>
                </div>
              </ContentLoader>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
