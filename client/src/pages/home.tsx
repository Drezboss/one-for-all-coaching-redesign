import { HeroSection, ExpectationSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Users, Shield, Star, Award, Target } from "lucide-react";
import { siteContent } from "@shared/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ExpectationSection />
      <ServicesSection />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--apd-blue)] mb-4">
              TRUSTED BY THE BEST
            </h2>
            <p className="text-xl text-gray-600">See what professional coaches say about APD</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The 6 station circuit is something I really liked the look of and I can see how it hugely benefits the players. After watching Harry deliver numerous sessions to my own son, I would highly recommend him to anyone."
              </p>
              <div className="font-bold text-gray-900">Scott Parker</div>
              <div className="text-sm text-gray-600">AFC Bournemouth Head Coach & Ex-England International</div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Harry has a real interest in the development of young players and is always striving to improve himself. I have worked alongside many young coaches and I place Harry alongside the very best I have seen."
              </p>
              <div className="font-bold text-gray-900">Michael Beale</div>
              <div className="text-sm text-gray-600">QPR First Team Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--apd-blue)] mb-4">
              SUCCESS STORIES
            </h2>
            <p className="text-xl text-gray-600">APD players making it to the next level</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 text-[var(--apd-blue)] mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Darko Gyabi</h3>
              <p className="text-gray-600 mb-2">England Youth International Captain & Leeds FC</p>
              <p className="text-sm text-gray-500 italic">
                "Harry helped me improve as a footballer and as a person off the pitch."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Target className="w-12 h-12 text-[var(--apd-blue)] mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Academy Success</h3>
              <p className="text-gray-600">Multiple players progressing to professional academy football</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Medal className="w-12 h-12 text-[var(--apd-blue)] mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Post-16 Scholars</h3>
              <p className="text-gray-600">Over 100 scholars combining education with elite football</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--apd-blue)] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            READY TO ENTER THE NEXT LEVEL?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join APD today and start your journey to becoming the best player you can be
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                Get Started
              </Button>
            </Link>
            <Link href="/training-centres">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                Find Your Centre
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
