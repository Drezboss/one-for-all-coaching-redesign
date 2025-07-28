import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, MessageSquare, Trophy, Target, Clock, MapPin, CheckCircle, Star } from "lucide-react";

export default function GroupSessions() {
  const benefits = [
    {
      icon: Users,
      title: "Shared Learning Experience",
      description: "Learn from each other while maintaining individual attention and development focus.",
    },
    {
      icon: MessageSquare,
      title: "Communication Skills",
      description: "Develop crucial on-field communication and leadership abilities through team-based scenarios.",
    },
    {
      icon: Trophy,
      title: "Competitive Environment",
      description: "Healthy competition pushes every player to perform at their best while supporting teammates.",
    },
    {
      icon: Target,
      title: "Game-Realistic Training",
      description: "Practice real match situations with multiple players, making training more game-like and effective.",
    },
  ];

  const sessionComponents = [
    {
      title: "Dynamic Warm-up",
      duration: "10 mins",
      description: "Group warm-up with ball work and coordination exercises",
    },
    {
      title: "Technical Skills",
      duration: "25 mins",
      description: "Individual and paired technical development with position-specific focus",
    },
    {
      title: "Small-Sided Games",
      duration: "30 mins",
      description: "Game scenarios practice with tactical decision-making emphasis",
    },
    {
      title: "Physical Conditioning",
      duration: "20 mins",
      description: "Football-specific fitness work integrated with competitive elements",
    },
    {
      title: "Cool-down & Review",
      duration: "5 mins",
      description: "Group reflection and individual feedback on session performance",
    },
  ];

  const groupTypes = [
    {
      title: "Friends & Siblings",
      description: "Perfect for friends who want to train together or siblings looking to develop alongside each other.",
      features: ["2-4 players", "Similar age groups", "Flexible scheduling", "Shared development goals"],
      ideal: "Ages 8-16 who know each other well",
    },
    {
      title: "Small Team Units",
      description: "Ideal for club teams, school squads, or established groups wanting specialized additional training.",
      features: ["4-6 players", "Position-specific work", "Team tactics focus", "Competition preparation"],
      ideal: "Established teams seeking extra development",
    },
    {
      title: "Skill-Level Groups",
      description: "Players of similar ability levels training together to push each other's development forward.",
      features: ["3-5 players", "Matched ability", "Progressive challenges", "Individual tracking"],
      ideal: "Players ready for the next level challenge",
    },
  ];

  const testimonials = [
    {
      name: "Rachel M.",
      role: "Parent of twin footballers",
      text: "Having my twins train together has been brilliant. They push each other but also support each other's development.",
    },
    {
      name: "Tom's U15 Team",
      role: "Local club team",
      text: "The additional group sessions have transformed our team's understanding and communication on the pitch.",
    },
    {
      name: "Emma K.",
      role: "Parent of 13-year-old midfielder",
      text: "My daughter loves the group dynamic. She's more confident and vocal on the pitch since starting these sessions.",
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
              src="/attached_assets/Group coaching with Dave_1753424086962.jpg"
              alt="Dave Cornock - Group Football Coaching Session"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm text-lfc-red font-semibold tracking-wider uppercase mb-4">
              GROUP SESSIONS
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
              👥 GROUP
              <br />
              <span className="text-lfc-red">SESSIONS</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Learn Together. Push Each Other. Grow as One.
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Ideal for small teams or friend groups, our sessions focus on shared development with individual attention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="btn-primary bg-lfc-red text-white hover:bg-bright-red font-bold text-lg px-8 py-4 transition-all duration-200">
                  Book Group Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHY CHOOSE <span className="text-lfc-red">GROUP SESSIONS</span>?
            </h2>
            <p className="text-xl text-gray-300">The power of training together with professional guidance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mr-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{benefit.description}</p>
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
              SESSION <span className="text-lfc-red">BREAKDOWN</span>
            </h2>
            <p className="text-xl text-gray-300">90 minutes of structured, engaging group development</p>
          </div>

          <div className="space-y-6">
            {sessionComponents.map((component, index) => (
              <Card key={index} className="bg-almost-black border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-lfc-red rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{component.title}</h3>
                    </div>
                    <div className="flex items-center text-lfc-red">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{component.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 ml-12">{component.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-almost-black p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Group Session Details</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <Users className="w-8 h-8 text-lfc-red mx-auto mb-2" />
                  <div className="text-white font-semibold">Group Size</div>
                  <div className="text-gray-300">2-6 players</div>
                </div>
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
                  <div className="text-gray-300">Individual within group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Types */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              GROUP <span className="text-lfc-red">OPTIONS</span>
            </h2>
            <p className="text-xl text-gray-300">Find the perfect group setup for your needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {groupTypes.map((type, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                  <p className="text-gray-300 mb-6">{type.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-200">
                        <CheckCircle className="w-5 h-5 text-lfc-red mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-almost-black p-4 rounded-lg border border-gray-800">
                    <div className="text-lfc-red font-semibold text-sm uppercase tracking-wide mb-1">Ideal For</div>
                    <div className="text-white">{type.ideal}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHAT'S <span className="text-lfc-red">INCLUDED</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Game-relevant drills and scenario play",
              "Communication and decision-making focus",
              "Fitness, teamwork, and leadership training",
              "Custom sessions for all ability levels",
              "Individual feedback within group setting",
              "Progress tracking for each player",
              "Professional equipment provided",
              "Video analysis when appropriate",
            ].map((item, index) => (
              <Card key={index} className="bg-almost-black border-gray-800 text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-lfc-red mx-auto mb-4" />
                  <p className="text-white font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              SUCCESS <span className="text-lfc-red">STORIES</span>
            </h2>
            <p className="text-xl text-gray-300">Groups that train together, succeed together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-lfc-red fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-200 mb-6 italic">"{testimonial.text}"</blockquote>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
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
            READY TO TRAIN AS A GROUP?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bring your friends, siblings, or teammates together for an unforgettable training experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-8 py-4 transition-all duration-200">
                Book Group Session
              </Button>
            </Link>
            <Link href="/individual-coaching">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 transition-all duration-200"
              >
                Compare with 1-2-1
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
