import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Users, Target, Trophy, ArrowRight } from "lucide-react";
import { siteContent } from "@shared/content";

export function ServicesSection() {
  const services = [
    {
      icon: User,
      title: "Individual Coaching",
      description: "Personalized 1-2-1 sessions tailored to your specific needs and goals",
      features: ["Technical skills development", "Position-specific training", "Mental game coaching"],
      link: "/individual-coaching",
      color: "bg-ne-blue",
    },
    {
      icon: Users,
      title: "Group Sessions",
      description: "Dynamic team training that builds skills through competitive practice",
      features: ["Small group dynamics", "Team tactics", "Match preparation"],
      link: "/group-sessions",
      color: "bg-ne-yellow",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Coaching Services
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Choose the training approach that best fits your development goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Color accent bar */}
              <div className={`absolute top-0 left-0 w-full h-2 ${service.color}`}></div>
              
              <div className="p-8">
                <div className={`w-16 h-16 ${service.color} ${service.color === 'bg-ne-yellow' ? 'text-gray-900' : 'text-white'} rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={service.link}>
                  <Button className="w-full btn-outline border-2 group-hover:bg-ne-blue group-hover:text-white group-hover:border-ne-blue transition-all duration-300">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional services */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Elite Coaching for Every Level
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From grassroots to academy level, our UEFA-qualified coaching delivers 
                professional training methods adapted to your current ability and future ambitions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-ne-blue mr-2" />
                  <span className="text-gray-700">Goal Setting</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-ne-blue mr-2" />
                  <span className="text-gray-700">Achievement Focus</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-ne-yellow rounded-full mb-4">
                <span className="text-5xl font-bold text-gray-900">95%</span>
              </div>
              <p className="text-lg text-gray-700 font-semibold">Player Satisfaction Rate</p>
              <p className="text-gray-600">Based on parent and player feedback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
