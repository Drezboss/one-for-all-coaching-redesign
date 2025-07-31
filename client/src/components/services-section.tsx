import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, GraduationCap, Sun, Users, Target, Trophy } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: MapPin,
      title: "⚽ Training Centres",
      subtitle: "Professional coaching at our dedicated facilities",
      description: "Join our training centres in Chatham and Eltham for regular coaching sessions designed to advance your game.",
      features: [
        "All weather pitches",
        "Professional coaching staff",
        "Age-specific programmes",
        "Small group sizes for individual attention",
      ],
      ctaText: "View Centres",
      link: "/training-centres",
    },
    {
      icon: Users,
      title: "💪 121 Training Sessions",
      subtitle: "Personalised Coaching. Accelerated Development.",
      description: "One-to-one coaching sessions tailored to your specific needs and development goals.",
      features: [
        "Personalised Development Plans",
        "Technical Skills Focus",
        "Position-Specific Training",
        "Video Analysis Available",
      ],
      ctaText: "Book 121 Session",
      link: "/training-centres/121-sessions",
    },
    {
      icon: GraduationCap,
      title: "🎓 Post-16 Football Academy",
      subtitle: "Education and Elite Football Combined",
      description: "Continue your education while pursuing elite football development at our partner colleges.",
      features: [
        "Full-time football programme",
        "Academic qualifications",
        "Professional coaching daily",
        "International tours",
      ],
      ctaText: "Apply Now",
      link: "/post-16-academy/apply",
    },
    {
      icon: Sun,
      title: "☀️ Holiday Camps",
      subtitle: "Keep developing during school holidays",
      description: "Fun, engaging holiday camps that maintain development momentum during school breaks.",
      features: [
        "Full day programmes",
        "Age-appropriate groups",
        "Skills challenges and tournaments",
        "Prizes and awards",
      ],
      ctaText: "Book Camp",
      link: "/holiday-camps",
    },
    {
      icon: Trophy,
      title: "🧤 Goalkeeper Academy",
      subtitle: "Specialist Goalkeeper Development",
      description: "Dedicated goalkeeper training with specialist coaches using modern techniques.",
      features: [
        "Technical shot-stopping",
        "Distribution and footwork",
        "Command of area",
        "Match psychology",
      ],
      ctaText: "Join Academy",
      link: "/training-centres/goalkeeper-academy",
    },
    {
      icon: Target,
      title: "👥 Team Training",
      subtitle: "Develop Together. Win Together.",
      description: "Professional team training packages for grassroots clubs looking to implement professional methods.",
      features: [
        "Tactical development",
        "Team cohesion building",
        "Match preparation",
        "Season-long programmes",
      ],
      ctaText: "Enquire Now",
      link: "/training-centres/team-training",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--apd-blue)] mb-4">
            OUR TRAINING PROGRAMMES
          </h2>
          <p className="text-xl text-gray-600">Choose the training approach that fits your development needs</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border-gray-200 hover:shadow-xl transition-all duration-200 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[var(--apd-blue)] rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-lg text-[var(--apd-blue)] font-semibold mb-4">{service.subtitle}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-[var(--apd-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={service.link}>
                  <Button className="bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-semibold w-full">
                    {service.ctaText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Enter the Next Level?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of players who have improved their game with APD. From grassroots to academy level, we have the right programme for you.
          </p>
          <Link href="/contact">
            <Button className="bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold text-lg px-8 py-4 transition-all duration-200">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
