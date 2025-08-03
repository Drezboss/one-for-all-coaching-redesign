import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Trophy, Users, Target, CheckCircle, Star, Award } from "lucide-react";
import { useContent, loadPageContent, loadCoachInfo, loadImages } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  // Load dynamic content
  const { data: pageContent, loading: pageLoading } = useContent(() => loadPageContent('about'));
  const { data: coachInfo, loading: coachLoading } = useContent(() => loadCoachInfo());
  const { data: images, loading: imagesLoading } = useContent(() => loadImages());

  if (pageLoading || coachLoading || imagesLoading) {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-dark-navy to-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                {pageContent?.title.replace('DAVE', '')} <span className="text-lfc-red">DAVE</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {pageContent?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4">
                    Book a Session
                  </Button>
                </Link>
                <Link href="/individual-coaching">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <div className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <img 
                  src={images?.coach?.main}
                  alt="Dave Cornock - UEFA B Licensed Football Coach in Professional Setting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              PROFESSIONAL <span className="text-lfc-red">CREDENTIALS</span>
            </h2>
            <p className="text-xl text-gray-300">Qualified, experienced, and committed to excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachInfo?.credentials.map((credential, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-lfc-red mr-4 flex-shrink-0" />
                  <span className="text-white font-medium">{credential}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                ABOUT ME – <span className="text-lfc-red">{coachInfo?.name.toUpperCase()}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {coachInfo?.bio}
              </p>
              <p className="text-lg text-gray-300 mb-8">
                {coachInfo?.philosophy}
              </p>
              <p className="text-lg text-lfc-red font-semibold mb-8">
                Let's build a stronger, smarter game — together.
              </p>
              
              <div className="bg-almost-black p-6 rounded-lg border border-gray-800">
                <blockquote className="text-xl italic text-gray-200 mb-4">
                  "{coachInfo?.quote}"
                </blockquote>
                <cite className="text-lfc-red font-semibold">— {coachInfo?.name.split(' ')[0]}, Head Coach</cite>
              </div>
            </div>
            <div>
              <div className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <img 
                  src={images?.coach?.sideline}
                  alt="Dave Cornock - Professional Coaching from the Sidelines"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div dangerouslySetInnerHTML={{ __html: pageContent?.content || '' }} className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-h2:text-4xl prose-h2:mb-8 prose-h3:text-2xl prose-h3:text-lfc-red prose-p:text-gray-300" />
        </div>
      </section>



      {/* Coaching Gallery Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              COACHING IN <span className="text-lfc-red">ACTION</span>
            </h2>
            <p className="text-xl text-gray-300">See Dave's professional coaching across all levels and age groups</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Tiny titans sat with Coach Dave_1753424086965.jpg"
                alt="Dave coaching young players - Tiny Titans session"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Tiny Titans with Caoch Dave_1753424086965.jpg"
                alt="Dave with young player - individual attention"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/coach dave u7s_1753424086966.jpg"
                alt="Dave coaching U7s outdoor session"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Tint Titan activity_1753424086964.jpg"
                alt="Dave coaching indoor skills session"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Always watching the players coach dave_1753424086966.jpg"
                alt="Dave observing and analyzing player performance"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Coach dave football party_1753424086967.jpg"
                alt="Dave at community football event"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lfc-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take the first step towards becoming the best version of yourself with professional coaching that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-8 py-4 transition-all duration-200">
                Book Your First Session
              </Button>
            </Link>
            <Link href="/individual-coaching">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
