import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Target, Video, TrendingUp, Brain, Clock, MapPin, CheckCircle, Star } from "lucide-react";

export default function IndividualCoaching() {
  const features = [
    {
      icon: Target,
      title: "Personalised Training Plans",
      description: "Every session is designed around your position, playing style, and specific goals. No generic programs here.",
    },
    {
      icon: Video,
      title: "Video Analysis & Feedback",
      description: "Professional video review of your technique and tactical decisions, with detailed feedback for improvement.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed monitoring of your development with regular assessments and milestone celebrations.",
    },
    {
      icon: Brain,
      title: "Mental Conditioning",
      description: "Building confidence, focus, and decision-making skills that are crucial for peak performance.",
    },
  ];

  const sessionStructure = [
    {
      phase: "Warm-up & Assessment",
      duration: "15 minutes",
      description: "Dynamic warm-up tailored to your needs with quick skill assessment",
    },
    {
      phase: "Technical Development",
      duration: "30 minutes",
      description: "Focused work on specific technical skills relevant to your position and goals",
    },
    {
      phase: "Tactical Training",
      duration: "25 minutes",
      description: "Game-realistic scenarios and decision-making practice",
    },
    {
      phase: "Physical Conditioning",
      duration: "15 minutes",
      description: "Football-specific fitness work integrated with ball skills",
    },
    {
      phase: "Cool-down & Review",
      duration: "5 minutes",
      description: "Session recap with immediate feedback and next steps",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      age: "Parent of 14-year-old midfielder",
      text: "The improvement in my daughter's confidence and technical ability has been incredible. Dave's individual approach really works.",
    },
    {
      name: "James T.",
      age: "16-year-old striker",
      text: "The video analysis sessions are game-changers. Seeing my mistakes and improvements clearly has accelerated my development.",
    },
    {
      name: "Mark L.",
      age: "Parent of 12-year-old defender",
      text: "Professional, reliable, and results-driven. My son looks forward to every session and the progress is obvious.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-dark-navy to-almost-black">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 overflow-hidden">
            <img 
              src="/attached_assets/Dave with player swindown town_1753424086965.jpg"
              alt="Dave Cornock - Individual Football Coaching with Player"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4">
              INDIVIDUAL COACHING
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
              💪 1-2-1 INDIVIDUAL
              <br />
              <span className="text-lfc-red">PROGRAM LEARNING</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Personalised Coaching. Real Progress.
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Led by a UEFA B License coach, our 1-2-1 sessions are built around you — your position, your goals, your pace.
            </p>
            <p className="text-lg text-lfc-red italic mb-8 max-w-2xl">
              Become the best version of yourself — one session at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200">
                  Book Your Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHAT'S <span className="text-lfc-red">INCLUDED</span>
            </h2>
            <p className="text-xl text-gray-300">Every 1-2-1 session is packed with value</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Session Structure */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              SESSION <span className="text-lfc-red">STRUCTURE</span>
            </h2>
            <p className="text-xl text-gray-300">90 minutes of focused, professional development</p>
          </div>

          <div className="space-y-6">
            {sessionStructure.map((phase, index) => (
              <Card key={index} className="bg-almost-black border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-lfc-red rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                    </div>
                    <div className="flex items-center text-lfc-red">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{phase.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 ml-12">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-almost-black p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Session Details</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="w-8 h-8 text-lfc-red mx-auto mb-2" />
                  <div className="text-white font-semibold">Duration</div>
                  <div className="text-gray-300">90 minutes</div>
                </div>
                <div>
                  <MapPin className="w-8 h-8 text-lfc-red mx-auto mb-2" />
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-gray-300">Professional facilities</div>
                </div>
                <div>
                  <Target className="w-8 h-8 text-lfc-red mx-auto mb-2" />
                  <div className="text-white font-semibold">Focus</div>
                  <div className="text-gray-300">100% personalised</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHO IT'S <span className="text-lfc-red">FOR</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Ambitious Players</h3>
                <p className="text-gray-300 mb-6">Players looking to take their game to the next level with professional-standard training and personalized development.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Technical refinement</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Tactical understanding</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Mental preparation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Skill Development</h3>
                <p className="text-gray-300 mb-6">Players wanting to improve specific aspects of their game or overcome particular challenges in their development.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Position-specific training</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Weakness elimination</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Strength maximization</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Confidence Building</h3>
                <p className="text-gray-300 mb-6">Players who need to build confidence, overcome setbacks, or develop a winning mindset both on and off the pitch.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Mental resilience</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Self-belief building</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CheckCircle className="w-4 h-4 text-lfc-red mr-2" />
                    <span className="text-sm">Performance mindset</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHAT PLAYERS <span className="text-lfc-red">SAY</span>
            </h2>
            <p className="text-xl text-gray-300">Real results from real players and families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-almost-black border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-lfc-red fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-200 mb-6 italic">"{testimonial.text}"</blockquote>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.age}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lfc-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            READY TO UNLOCK YOUR POTENTIAL?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the growing number of players who are transforming their game with professional 1-2-1 coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-8 py-4 transition-all duration-200">
                Book Your First Session
              </Button>
            </Link>
            <Link href="/group-sessions">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200"
              >
                View Group Sessions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
