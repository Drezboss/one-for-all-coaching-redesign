import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Sun, Trophy, Users, Clock, Shield, Star, Award } from "lucide-react";
import { siteContent } from "@shared/content";

export default function HolidayCamps() {
  const features = [
    {
      icon: Clock,
      title: "Full Day Programmes",
      description: "9am - 4pm daily sessions with structured activities throughout"
    },
    {
      icon: Users,
      title: "Age-Appropriate Groups",
      description: "Grouped by age and ability for optimal development"
    },
    {
      icon: Trophy,
      title: "Skills Challenges",
      description: "Daily competitions and skill tests to keep players engaged"
    },
    {
      icon: Award,
      title: "Prizes & Awards",
      description: "Recognition for effort, improvement and achievement"
    },
    {
      icon: Shield,
      title: "Qualified Supervision",
      description: "DBS-checked coaches ensuring safe, professional environment"
    },
    {
      icon: Sun,
      title: "Fun First Approach",
      description: "Learning through enjoyment - the APD way"
    }
  ];

  const campSchedule = [
    {
      name: "Easter Camp",
      dates: "1st - 5th April 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Booking Open"
    },
    {
      name: "May Half Term",
      dates: "27th - 31st May 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Opening Soon"
    },
    {
      name: "Summer Camp Week 1",
      dates: "22nd - 26th July 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Opening Soon"
    },
    {
      name: "Summer Camp Week 2",
      dates: "29th July - 2nd August 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Opening Soon"
    },
    {
      name: "Summer Camp Week 3",
      dates: "5th - 9th August 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Opening Soon"
    },
    {
      name: "Summer Camp Week 4",
      dates: "12th - 16th August 2025",
      ages: "5-16 years",
      location: "Both Centres",
      status: "Opening Soon"
    }
  ];

  const dailySchedule = [
    { time: "9:00 - 9:30", activity: "Registration & Welcome Games" },
    { time: "9:30 - 10:45", activity: "Technical Skills Sessions" },
    { time: "10:45 - 11:00", activity: "Break & Refreshments" },
    { time: "11:00 - 12:00", activity: "Small-Sided Games" },
    { time: "12:00 - 1:00", activity: "Lunch Break" },
    { time: "1:00 - 2:15", activity: "Skills Challenges & Competitions" },
    { time: "2:15 - 2:30", activity: "Break & Refreshments" },
    { time: "2:30 - 3:45", activity: "Tournaments & Matches" },
    { time: "3:45 - 4:00", activity: "Awards & Home Time" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--apd-blue)] to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              APD HOLIDAY CAMPS
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Keep developing during school holidays with fun, engaging football camps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                  Book Now
                </Button>
              </Link>
              <a href="#schedule">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                  View Schedule
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            The Perfect School Holiday Activity
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            APD Holiday Camps provide the perfect blend of fun, learning, and physical activity during school breaks. 
            Our camps maintain the high coaching standards APD is known for while creating an enjoyable environment 
            where children can make new friends, stay active, and continue their football development.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            What Makes Our Camps Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 bg-[var(--apd-blue)] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            A Typical Day at APD Camp
          </h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--apd-blue)] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Time</th>
                      <th className="px-6 py-4 text-left font-semibold">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailySchedule.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-6 py-4 font-medium text-gray-700">{item.time}</td>
                        <td className="px-6 py-4 text-gray-600">{item.activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Camp Schedule */}
      <section id="schedule" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            2025 Camp Schedule
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campSchedule.map((camp, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Calendar className="w-8 h-8 text-[var(--apd-blue)]" />
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      camp.status === "Booking Open" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{camp.name}</h3>
                  <p className="text-gray-600 mb-1">{camp.dates}</p>
                  <p className="text-gray-600 mb-1">Ages: {camp.ages}</p>
                  <p className="text-gray-600 mb-4">Location: {camp.location}</p>
                  <Link href="/contact">
                    <Button className="w-full bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)]">
                      {camp.status === "Booking Open" ? "Book Now" : "Register Interest"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[var(--apd-blue)] mb-12">
            What to Bring
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Essential Kit</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Football boots (and trainers for indoor sessions)</li>
                  <li>• Shin pads (mandatory)</li>
                  <li>• Water bottle (refill stations available)</li>
                  <li>• Weather-appropriate clothing</li>
                  <li>• Sun cream (summer camps)</li>
                  <li>• Packed lunch and snacks</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Camp Includes</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional coaching throughout</li>
                  <li>• All equipment provided</li>
                  <li>• Camp certificate</li>
                  <li>• Daily prizes and awards</li>
                  <li>• End of camp tournament</li>
                  <li>• APD camp gift</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--apd-blue)] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-6">
            Secure Your Child's Place Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Limited spaces available - book early to avoid disappointment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-[var(--apd-blue)] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                Book Holiday Camp
              </Button>
            </Link>
            <Link href="/training-centres">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--apd-blue)] font-bold text-lg px-8 py-4">
                View Our Centres
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}