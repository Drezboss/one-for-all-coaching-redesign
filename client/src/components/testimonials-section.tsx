import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/scroll-animation";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Parent of U12 Player",
      content: "Dave's coaching has transformed my son's confidence on the pitch. The individual attention and technical development has been outstanding.",
      rating: 5,
      highlight: "transformed my son's confidence"
    },
    {
      name: "James Mitchell",
      role: "U16 Player",
      content: "The 1-2-1 sessions helped me secure a spot in the academy trials. Dave's tactical knowledge and personalized training made all the difference.",
      rating: 5,
      highlight: "secured a spot in the academy"
    },
    {
      name: "Mark Williams",
      role: "Grassroots Coach",
      content: "The coach mentorship program elevated my coaching to a new level. Dave's insights on player development are invaluable.",
      rating: 5,
      highlight: "elevated my coaching"
    },
    {
      name: "Emma Davies",
      role: "Parent of U14 Player",
      content: "My daughter loves the group sessions! The balance between fun and serious training is perfect. She's improved so much in just 3 months.",
      rating: 5,
      highlight: "improved so much"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHAT <span className="text-lfc-red">PARENTS & PLAYERS</span> SAY
            </h2>
            <p className="text-xl text-gray-300">Real stories from our coaching community</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation
              key={index}
              animation={index % 2 === 0 ? "slide-right" : "slide-left"}
              delay={index * 100}
            >
              <Card 
                className={cn(
                  "bg-almost-black border-gray-800 transition-all duration-300",
                  "hover:border-lfc-red hover:shadow-xl hover:shadow-lfc-red/10",
                  "group h-full"
                )}
              >
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <Quote className="w-8 h-8 text-lfc-red/30 mr-2 rotate-180" />
                    <div className="flex-1">
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        {testimonial.content.split(testimonial.highlight).map((part, i) => (
                          <span key={i}>
                            {part}
                            {i === 0 && (
                              <span className="text-white font-semibold transition-colors duration-300 group-hover:text-lfc-red">
                                {testimonial.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                    <Quote className="w-8 h-8 text-lfc-red/30 ml-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-lfc-red fill-current transition-transform duration-200 group-hover:scale-110"
                          style={{ animationDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up" delay={400}>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 mb-6">
              Join hundreds of players and coaches who are already elevating their game
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScrollAnimation animation="scale" delay={500}>
                <Card className="bg-almost-black border-gray-800 px-8 py-4">
                  <p className="text-3xl font-bold text-lfc-red">500+</p>
                  <p className="text-gray-400">Players Coached</p>
                </Card>
              </ScrollAnimation>
              <ScrollAnimation animation="scale" delay={600}>
                <Card className="bg-almost-black border-gray-800 px-8 py-4">
                  <p className="text-3xl font-bold text-lfc-red">95%</p>
                  <p className="text-gray-400">Satisfaction Rate</p>
                </Card>
              </ScrollAnimation>
              <ScrollAnimation animation="scale" delay={700}>
                <Card className="bg-almost-black border-gray-800 px-8 py-4">
                  <p className="text-3xl font-bold text-lfc-red">10+</p>
                  <p className="text-gray-400">Years Experience</p>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}