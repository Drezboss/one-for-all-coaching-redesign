import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trophy, Target, Users } from "lucide-react";
import { siteContent } from "@shared/content";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 opacity-10"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-[var(--apd-blue)] leading-tight mb-4">
            {siteContent.home.hero.title}
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-gray-600 mb-8">
            {siteContent.site.tagline}
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          {siteContent.home.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/contact">
            <Button className="bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold text-lg px-8 py-6 transition-all duration-200 shadow-lg hover:shadow-xl">
              {siteContent.home.hero.primaryButton}
            </Button>
          </Link>
          <Link href="/training-centres">
            <Button variant="outline" className="border-2 border-[var(--apd-blue)] text-[var(--apd-blue)] hover:bg-[var(--apd-blue)] hover:text-white font-bold text-lg px-8 py-6 transition-all duration-200">
              View Training Centres
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Trophy className="h-12 w-12 text-[var(--apd-blue)] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Standards</h3>
            <p className="text-gray-600">UEFA qualified coaches delivering academy-level training</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Target className="h-12 w-12 text-[var(--apd-blue)] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Proven Results</h3>
            <p className="text-gray-600">Track record of players progressing to professional academies</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Users className="h-12 w-12 text-[var(--apd-blue)] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">All Levels Welcome</h3>
            <p className="text-gray-600">From grassroots to elite, we develop every player</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExpectationSection() {
  const expectations = [
    {
      title: "Professional Coaching Excellence",
      description: "Experience coaching methods used at the highest levels of the game, delivered by qualified and passionate coaches.",
      icon: "🎯"
    },
    {
      title: "Individual Development Focus", 
      description: "Every session is designed to improve your technical skills, tactical understanding, and mental strength.",
      icon: "⚡"
    },
    {
      title: "Clear Progression Pathways",
      description: "From grassroots to academy level, we provide clear routes for players to advance their football journey.",
      icon: "📈"
    },
    {
      title: "Fun & Engaging Sessions",
      description: "Learning through enjoyment - our sessions combine serious development with the joy of playing football.",
      icon: "⚽"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--apd-blue)] mb-4">
            What to Expect at APD
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a football development programme trusted by parents and recommended by professional coaches
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {expectations.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="text-4xl mr-4">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about">
            <Button className="bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold text-lg px-8 py-4 transition-all duration-200">
              Learn More About APD
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
