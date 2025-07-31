import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, Clock, Users, Award, Target, Shield } from "lucide-react";

export default function TrainingCentres() {
  const centres = [
    {
      name: "Chatham Training Centre",
      location: "Chatham, Kent",
      description: "Our flagship centre in Kent offering state-of-the-art facilities with professional coaching staff delivering the APD methodology.",
      features: [
        "3G All-weather pitches",
        "Professional floodlighting",
        "Covered viewing area",
        "On-site parking",
        "Changing facilities"
      ],
      sessions: [
        "Monday: U7-U10 (5:00-6:00pm)",
        "Tuesday: U11-U14 (6:00-7:30pm)",
        "Wednesday: Goalkeeper Academy (5:30-7:00pm)",
        "Thursday: U15-U18 (6:30-8:00pm)",
        "Saturday: Development Squad (9:00-11:00am)"
      ],
      link: "/training-centres/chatham"
    },
    {
      name: "Eltham Training Centre",
      location: "Eltham, South East London",
      description: "Our South East London centre offering the same high-quality APD coaching standards in a convenient location for London-based players.",
      features: [
        "Modern 4G pitch",
        "Indoor training facility",
        "Professional equipment",
        "Easy transport links",
        "Spectator seating"
      ],
      sessions: [
        "Monday: U8-U11 (5:30-6:30pm)",
        "Tuesday: Girls Only Sessions (5:00-6:30pm)",
        "Wednesday: U12-U16 (6:00-7:30pm)",
        "Thursday: 121 Sessions (By appointment)",
        "Friday: Elite Training Group (6:00-8:00pm)"
      ],
      link: "/training-centres/eltham"
    }
  ];

  const programmes = [
    {
      icon: Users,
      title: "Age Group Training",
      description: "Structured sessions for all age groups from U7 to U18, focusing on technical development and game understanding."
    },
    {
      icon: Target,
      title: "121 Training Sessions",
      description: "Personalised one-to-one coaching tailored to individual player needs and development goals."
    },
    {
      icon: Shield,
      title: "Goalkeeper Academy",
      description: "Specialist goalkeeper coaching with dedicated GK coaches using modern training methods."
    },
    {
      icon: Award,
      title: "Elite Development Squad",
      description: "For players showing exceptional potential, with pathways to professional academy trials."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--apd-blue)] to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              APD TRAINING CENTRES
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional coaching at our dedicated facilities in Chatham and Eltham
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                  Book Trial Session
                </Button>
              </Link>
              <a href="#centres">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                  View Locations
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Where Excellence Meets Opportunity
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            APD Training Centres are more than just football facilities - they're development hubs where 
            players of all levels come to improve their game. With professional coaches, modern facilities, 
            and a proven track record of player progression, we provide the perfect environment for football development.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold text-[var(--apd-blue)]">2</div>
              <div className="text-gray-600">Training Centres</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--apd-blue)]">500+</div>
              <div className="text-gray-600">Active Players</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--apd-blue)]">15+</div>
              <div className="text-gray-600">Qualified Coaches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--apd-blue)]">50+</div>
              <div className="text-gray-600">Academy Progressions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            Our Training Programmes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmes.map((programme, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <programme.icon className="w-12 h-12 text-[var(--apd-blue)] mb-4 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{programme.title}</h3>
                  <p className="text-gray-600">{programme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Centres */}
      <section id="centres" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            Our Locations
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {centres.map((centre, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-[var(--apd-blue)] text-white p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{centre.name}</h3>
                      <div className="flex items-center text-blue-100">
                        <MapPin className="w-4 h-4 mr-2" />
                        {centre.location}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">{centre.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Facilities</h4>
                    <ul className="space-y-2">
                      {centre.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-[var(--apd-blue)] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Weekly Sessions
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {centre.sessions.map((session, sessionIndex) => (
                        <li key={sessionIndex} className="text-gray-600">{session}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href={centre.link}>
                    <Button className="w-full bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)]">
                      View Centre Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--apd-blue)] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-6">
            Start Your APD Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our training centres and experience the APD difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                Book Free Trial
              </Button>
            </Link>
            <Link href="/training-centres/loyalty-cards">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                View Loyalty Cards
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}