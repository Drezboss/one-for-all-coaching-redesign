import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Trophy, Award, Users, Target } from "lucide-react";

export function MobileAboutSection() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    qualifications: false,
    experience: false,
    philosophy: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const qualifications = [
    "UEFA B License",
    "FA Level 2 Certificate in Coaching Football",
    "FA Level 1 Certificate in Coaching Football",
    "Emergency First Aid in Football",
    "Safeguarding Children Certificate",
  ];

  const experience = [
    "Professional football coaching since 2018",
    "Worked with players from grassroots to semi-professional level",
    "Specialized in individual player development",
    "Experience with youth and adult players",
    "All-weather coaching expertise",
  ];

  const philosophy = [
    "Player-centered approach to development",
    "Focus on technical, tactical, and mental aspects",
    "Building confidence and game intelligence",
    "Long-term player development principles",
    "Creating adaptable, thinking players",
  ];

  return (
    <section className="py-12 bg-almost-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            ABOUT <span className="text-lfc-red">DAVE CORNOCK</span>
          </h2>
          <p className="text-lg text-gray-300">Professional Football Coach & Mentor</p>
        </div>

        {/* Profile Card */}
        <Card className="bg-black border-gray-800 mb-8">
          <CardContent className="p-6">
            {/* Portrait Image */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-lfc-red">
                <img 
                  src="/attached_assets/Coach dave all weather coaching_1753424086964.jpg"
                  alt="Dave Cornock - Professional Football Coach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Dave Cornock</h3>
              <p className="text-lfc-red font-semibold">UEFA B Licensed Coach</p>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Dedicated football coach with a passion for developing players at every level. 
              Specializing in individual coaching that focuses on technical skills, tactical understanding, 
              and mental strength. Committed to helping players reach their full potential through 
              personalized training programs and all-weather coaching sessions.
            </p>
          </CardContent>
        </Card>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Qualifications Section */}
          <Card className="bg-black border-gray-800">
            <CardContent className="p-0">
              <button
                onClick={() => toggleSection('qualifications')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-lfc-red mr-3" />
                  <h3 className="text-lg font-bold text-white">Qualifications</h3>
                </div>
                {expandedSections.qualifications ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedSections.qualifications && (
                <div className="px-6 pb-6">
                  <ul className="space-y-2">
                    {qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <Trophy className="w-4 h-4 text-lfc-red mr-2 mt-0.5 flex-shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="bg-black border-gray-800">
            <CardContent className="p-0">
              <button
                onClick={() => toggleSection('experience')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-lfc-red mr-3" />
                  <h3 className="text-lg font-bold text-white">Experience</h3>
                </div>
                {expandedSections.experience ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedSections.experience && (
                <div className="px-6 pb-6">
                  <ul className="space-y-2">
                    {experience.map((exp, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <Target className="w-4 h-4 text-lfc-red mr-2 mt-0.5 flex-shrink-0" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Philosophy Section */}
          <Card className="bg-black border-gray-800">
            <CardContent className="p-0">
              <button
                onClick={() => toggleSection('philosophy')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 text-lfc-red mr-3" />
                  <h3 className="text-lg font-bold text-white">Coaching Philosophy</h3>
                </div>
                {expandedSections.philosophy ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedSections.philosophy && (
                <div className="px-6 pb-6">
                  <ul className="space-y-2">
                    {philosophy.map((phil, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <Award className="w-4 h-4 text-lfc-red mr-2 mt-0.5 flex-shrink-0" />
                        <span>{phil}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <p className="text-gray-300 mb-6">
            Ready to start your football development journey?
          </p>
          <Button className="bg-lfc-red text-white hover:bg-bright-red font-semibold py-3 px-8 min-h-[44px]">
            Book Your Session
          </Button>
        </div>
      </div>
    </section>
  );
}