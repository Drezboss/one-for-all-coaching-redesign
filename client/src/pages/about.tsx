import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Medal, Trophy, Users, Target, CheckCircle, Star, Award, Calendar, MapPin, Mail, Phone, Play, Pause, Volume2, VolumeX, Download, Share2, ArrowRight, Zap, Heart, Shield } from "lucide-react";
import { siteContent } from "@shared/content";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ProgressiveLoader, SkeletonProfile, SkeletonCard } from "@/components/ui/skeleton-loading";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeCredential, setActiveCredential] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const credentials = [
    { 
      title: "UEFA B License", 
      description: "Advanced tactical and technical coaching qualification",
      year: "2023",
      icon: Trophy,
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    },
    { 
      title: "FA Level 2", 
      description: "Comprehensive coaching methodology and player development",
      year: "2022",
      icon: Medal,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20"
    },
    { 
      title: "DBS Checked", 
      description: "Enhanced disclosure and safeguarding certification",
      year: "2024",
      icon: Shield,
      color: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    { 
      title: "First Aid", 
      description: "Sports first aid and emergency response qualified",
      year: "2024",
      icon: Heart,
      color: "bg-red-500/10 text-red-600 border-red-500/20"
    },
  ];

  const achievements = [
    {
      icon: Users,
      title: "Player Development",
      description: "Dedicated to helping players at all levels reach their potential through personalized coaching approaches",
      stat: "200+",
      statLabel: "Players Coached"
    },
    {
      icon: Star,
      title: "Individual Focus",
      description: "Every session is tailored to the specific needs and goals of each player",
      stat: "95%",
      statLabel: "Success Rate"
    },
    {
      icon: Award,
      title: "Professional Standards",
      description: "UEFA B License qualified, bringing professional standards to every training session",
      stat: "10+",
      statLabel: "Years Experience"
    },
    {
      icon: Target,
      title: "Grassroots Excellence",
      description: "Passionate about developing football at the grassroots level across all age groups",
      stat: "50+",
      statLabel: "Teams Trained"
    },
  ];

  const coachingPhilosophy = [
    {
      title: "Individual Development",
      description: "Every player is unique with their own strengths, challenges, and goals. My approach is tailored to bring out the best in each individual.",
      icon: Target,
      points: ["Personalized training plans", "Individual skill assessment", "Goal-oriented development", "Continuous progress tracking"]
    },
    {
      title: "Technical Excellence",
      description: "Building solid technical foundations while developing tactical understanding that will serve players throughout their football journey.",
      icon: Zap,
      points: ["Fundamental skill development", "Advanced technique refinement", "Tactical awareness", "Game situation practice"]
    },
    {
      title: "Holistic Growth",
      description: "Football is a vehicle for personal growth. Focus on confidence, discipline, and life skills that extend beyond the pitch.",
      icon: Heart,
      points: ["Mental resilience", "Leadership skills", "Team collaboration", "Personal confidence"]
    },
  ];

  const stats = [
    { label: "Players Coached", value: 200, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Success Stories", value: 95, suffix: "%" },
    { label: "Teams Trained", value: 50, suffix: "+" },
  ];

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
          <motion.div 
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
          />
          
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            <StaggerContainer className="grid lg:grid-cols-2 gap-12 items-center">
              <StaggerItem>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 text-sm bg-primary/20 text-primary font-semibold tracking-wider uppercase mb-4 px-4 py-2 rounded-full border border-primary/30"
                  >
                    <Trophy className="w-4 h-4" />
                    UEFA B Licensed Coach
                  </motion.div>
                  
                  <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                    {siteContent.about.hero.title}
                  </h1>
                  
                  <p className="text-responsive-lg text-muted-foreground leading-relaxed">
                    {siteContent.about.hero.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {credentials.slice(0, 3).map((credential, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className={credential.color}
                      >
                        <credential.icon className="w-3 h-3 mr-1" />
                        {credential.title}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/contact">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="btn-primary group">
                          Book a Session
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const element = document.getElementById('philosophy');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift"
                  >
                    <img 
                      src={siteContent.images.coach.main}
                      alt="Dave Cornock - UEFA B Licensed Football Coach"
                      className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    
                    {/* Video Overlay Example - Replace with actual video */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleVideo}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 text-black ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                  
                  {/* Floating Contact Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-6 -right-6 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg"
                  >
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{siteContent.site.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{siteContent.site.email}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Animated Stats Section */}
        <section ref={statsRef} className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isStatsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                    className="text-4xl md:text-5xl font-black text-primary mb-2"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isStatsInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.span>
                  </motion.div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Professional Qualifications
              </h2>
              <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
                Bringing professional standards and expertise to every coaching session
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setActiveCredential(index)}
                  onHoverEnd={() => setActiveCredential(null)}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Card className={`card-elevated h-full transition-all duration-300 cursor-pointer ${credential.color} ${activeCredential === index ? 'shadow-xl' : ''}`}>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        animate={activeCredential === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <credential.icon className="w-8 h-8 text-primary" />
                      </motion.div>
                      
                      <h3 className="font-bold text-lg mb-2">{credential.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{credential.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {credential.year}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching Philosophy Section */}
        <section id="philosophy" className="section-padding bg-secondary/5">
          <div className="max-w-7xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Coaching Philosophy
              </h2>
              <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
                My approach to football coaching is built on three core principles that guide every session
              </p>
            </motion.div>

            <div className="space-y-12">
              {coachingPhilosophy.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <principle.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{principle.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {principle.points.map((point, pointIndex) => (
                          <motion.div
                            key={pointIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: pointIndex * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
                    >
                      <img 
                        src={index === 0 ? siteContent.images.coaching.individual : 
                             index === 1 ? siteContent.images.coaching.group : 
                             siteContent.images.coaching.youth}
                        alt={`${principle.title} - Dave Cornock Coaching`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto container-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Ready to Start Your Football Journey?
              </h2>
              
              <p className="text-responsive-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're just starting out or looking to take your game to the next level, 
                I'm here to help you achieve your football goals with professional, personalized coaching.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="btn-primary group text-lg px-8 py-4">
                      Book Your First Session
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/individual-coaching">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="group text-lg px-8 py-4 border-2">
                      View Services
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
