import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield } from "lucide-react";
import { useContent, loadPageContent, loadImages } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";


export default function Home() {
  // Load page content and images
  const { data: pageContent, loading: pageLoading } = useContent(() => loadPageContent('home'));
  const { data: images, loading: imagesLoading } = useContent(() => loadImages());

  if (pageLoading || imagesLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

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
                  src={images?.coach?.celebration}
                  alt="Dave Cornock - Celebrating Success with Players"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: pageContent?.content || '' }} className="prose prose-invert prose-lg max-w-none" />

              <div className="mt-8">
                <Link href="/about">
                  <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200">
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
