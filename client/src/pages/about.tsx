import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Trophy, Users, Target, CheckCircle, Star, Award } from "lucide-react";

export default function About() {
  const credentials = [
    "UEFA B License qualified",
    "FA Level 2 Coaching Badge",
    "Semi-professional playing experience",
    "Grassroots to elite level coaching",
    "DBS checked and safeguarding certified",
    "First Aid qualified",
  ];

  const achievements = [
    {
      icon: Users,
      title: "Player Development",
      description: "Dedicated to helping players at all levels reach their potential through personalized coaching approaches",
    },
    {
      icon: Star,
      title: "Individual Focus",
      description: "Every session is tailored to the specific needs and goals of each player",
    },
    {
      icon: Award,
      title: "UEFA B Licensed",
      description: "Qualified with UEFA B License, bringing professional standards to every training session",
    },
    {
      icon: Trophy,
      title: "Grassroots Excellence",
      description: "Passionate about developing football at the grassroots level across all age groups",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-dark-navy to-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                MEET <span className="text-lfc-red">DAVE</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your dedicated coach with the experience, qualifications, and passion to help you unlock your potential on and off the pitch.
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
                  src="/attached_assets/In the dugouts_1753424086963.jpg"
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
            {credentials.map((credential, index) => (
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
                ABOUT ME – <span className="text-lfc-red">DAVE CORNOCK</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                I'm Dave Cornock, a UEFA B Licensed football coach with a broad coaching background that spans all levels of the game. My journey has taken me from grassroots football and local leagues, through the Junior Premier League (JPL) and Hellenic League, to coaching elite Tier 2 women's university teams and UDA overseas students.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                I'm passionate about helping players and coaches unlock their full potential. Whether it's delivering tailored 1-to-1 sessions, designing structured training plans, or mentoring coaches throughout a season, I'm here to support your growth and development.
              </p>
              <p className="text-lg text-lfc-red font-semibold mb-8">
                Let's build a stronger, smarter game — together.
              </p>
              
              <div className="bg-almost-black p-6 rounded-lg border border-gray-800">
                <blockquote className="text-xl italic text-gray-200 mb-4">
                  "Your journey is unique. Your development should be too."
                </blockquote>
                <cite className="text-lfc-red font-semibold">— Dave, Head Coach</cite>
              </div>
            </div>
            <div>
              <div className="rounded-lg shadow-2xl w-full h-96 overflow-hidden">
                <img 
                  src="/attached_assets/Coach dave on sidelines_1753424086964.jpg"
                  alt="Dave Cornock - Professional Coaching from the Sidelines"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              PROVEN <span className="text-lfc-red">RESULTS</span>
            </h2>
            <p className="text-xl text-gray-300">Track record of excellence in player development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mr-4">
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              COACHING <span className="text-lfc-red">PHILOSOPHY</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-almost-black border-gray-800 text-center">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-lfc-red mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Individual Focus</h3>
                <p className="text-gray-300">Every player is unique with their own strengths, challenges, and goals. Our approach is tailored to bring out the best in each individual.</p>
              </CardContent>
            </Card>

            <Card className="bg-almost-black border-gray-800 text-center">
              <CardContent className="p-8">
                <Medal className="w-12 h-12 text-lfc-red mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Technical Excellence</h3>
                <p className="text-gray-300">Building solid technical foundations while developing tactical understanding that will serve players throughout their football journey.</p>
              </CardContent>
            </Card>

            <Card className="bg-almost-black border-gray-800 text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-lfc-red mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Holistic Development</h3>
                <p className="text-gray-300">Football is a vehicle for personal growth. We focus on confidence, discipline, and life skills that extend beyond the pitch.</p>
              </CardContent>
            </Card>
          </div>
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
