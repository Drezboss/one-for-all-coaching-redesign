import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Medal, Trophy, Users, Target, CheckCircle, Star, Award, Quote } from "lucide-react";
import { siteContent } from "@shared/content";

export default function About() {
  const credentials = siteContent.coach.credentials;

  const achievements = [
    {
      icon: Users,
      title: "Player Development Excellence",
      description: "Track record of developing players from grassroots to professional academy level",
    },
    {
      icon: Star,
      title: "Innovative Training Methods",
      description: "Unique 6 station circuit system that maximizes player engagement and development",
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Recommended by top coaches including Michael Beale and Scott Parker",
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "Multiple success stories including Darko Gyabi (England Youth Captain)",
    },
  ];

  const testimonials = [
    {
      quote: "I have known Harry for over 10 years. In this time I have seen his huge passion for football progress from playing to his current role as a fine young coach.",
      author: "Michael Beale",
      role: "QPR First Team Manager"
    },
    {
      quote: "The 6 station circuit is something I really liked the look of and I can see how it hugely benefits the players.",
      author: "Scott Parker",
      role: "AFC Bournemouth Head Coach"
    },
    {
      quote: "Harry has been a key part of my journey helping me progress from when I was a youngster at Chelsea and Millwall.",
      author: "Darko Gyabi",
      role: "England Youth International Captain"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--apd-blue)] to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              ABOUT APD
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {siteContent.coach.philosophy}
            </p>
          </div>
        </div>
      </section>

      {/* Harry Watling Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-[var(--apd-blue)] mb-6">
                MEET HARRY WATLING
              </h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                {siteContent.coach.title}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {siteContent.coach.bio}
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Qualifications & Experience</h4>
                <ul className="space-y-3">
                  {credentials.map((credential, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[var(--apd-blue)] mr-3" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/contact">
                <Button className="bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold text-lg px-8 py-4">
                  Get In Touch
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <achievement.icon className="w-10 h-10 text-[var(--apd-blue)] mb-3" />
                    <h4 className="font-bold text-gray-800 mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APD Philosophy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-[var(--apd-blue)] mb-8">
            THE APD WAY
          </h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            The APD way is a philosophy built upon taking our love for the game and instilling it in our players. 
            We believe in creating an environment where players can develop their skills, build confidence, and 
            achieve their goals through professional coaching and innovative training methods.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Standards</h3>
              <p className="text-gray-600">Academy-level coaching for all players</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Individual Focus</h3>
              <p className="text-gray-600">Tailored development for every player</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-gray-600">Clear pathways to success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            WHAT PROFESSIONALS SAY
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-[var(--apd-blue)] mb-4" />
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            OUR JOURNEY
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-4 h-4 bg-[var(--apd-blue)] rounded-full mt-2 mr-6 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Founded with a Vision</h3>
                <p className="text-gray-600">
                  APD was founded by Harry Watling with a clear vision: to provide professional-standard 
                  football coaching accessible to all young players in South East London and Kent.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 bg-[var(--apd-blue)] rounded-full mt-2 mr-6 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Growing Success</h3>
                <p className="text-gray-600">
                  From humble beginnings, APD has grown to operate two training centres, multiple 
                  programmes, and has helped numerous players progress to professional academies.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 bg-[var(--apd-blue)] rounded-full mt-2 mr-6 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Future Focused</h3>
                <p className="text-gray-600">
                  We continue to innovate and expand our programmes, always maintaining our core 
                  philosophy of excellence in player development and making football accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--apd-blue)] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-6">
            JOIN THE APD FAMILY
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference professional coaching can make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training-centres">
              <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                View Our Programmes
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
