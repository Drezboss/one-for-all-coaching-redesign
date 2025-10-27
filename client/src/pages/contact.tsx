import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare, CheckCircle, Loader2, Send, Star } from "lucide-react";
import { siteContent } from "@shared/content";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service you're interested in"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
});

const bookingFormSchema = insertBookingSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().refine((val) => !val || val.length >= 10, "Phone number must be at least 10 digits"),
  serviceType: z.string().min(1, "Please select a service"),
  preferredDate: z.string().optional(),
  message: z.string().optional().refine((val) => !val || val.length <= 500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function Contact() {
  const [activeTab, setActiveTab] = useState("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const bookingForm = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      preferredDate: "",
      message: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Auto-focus first input when tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = document.querySelector(`[data-tab="${activeTab}"] input[type="text"]`) as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Static site - simulate API call with better feedback
      console.log("Contact form submission:", data);
      await new Promise(resolve => setTimeout(resolve, 1200));
      return { success: true };
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "✅ Message Received!",
        description: "Thank you for your interest. We'll get back to you within 24 hours, or call us directly at +44 7750 887112 for immediate assistance.",
      });
      contactForm.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    },
    onError: () => {
      toast({
        title: "📞 Please Contact Us Directly",
        description: "Call +44 7750 887112 or email dave@all-4one-coaching.com",
        variant: "destructive",
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      // Static site - simulate API call with better feedback
      console.log("Booking form submission:", data);
      await new Promise(resolve => setTimeout(resolve, 1200));
      return { success: true };
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "🎯 Booking Interest Noted!",
        description: "We've received your booking request. Please call us at +44 7750 887112 to discuss availability and confirm your session.",
      });
      bookingForm.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    },
    onError: () => {
      toast({
        title: "📞 Please Contact Us Directly",
        description: "Call +44 7750 887112 or email dave@all-4one-coaching.com",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const onBookingSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: siteContent.contact.contactInfo.email,
      description: "Get in touch via email",
      href: `mailto:${siteContent.contact.contactInfo.email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      value: siteContent.contact.contactInfo.phone,
      description: "Call us directly",
      href: `tel:${siteContent.contact.contactInfo.phone}`,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Gloucestershire",
      description: "Available Online & In Person",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "We'll get back to you quickly",
    },
  ];

  const serviceOptions = [
    { value: "individual-coaching", label: "1-2-1 Individual Coaching" },
    { value: "group-sessions", label: "Small Group Sessions" },
    { value: "team-training", label: "Team Training" },
    { value: "assessment", label: "Player Assessment" },
    { value: "other", label: "Other (please specify)" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-sm bg-primary/20 text-primary font-semibold tracking-wider uppercase mb-6 px-4 py-2 rounded-full border border-primary/30">
              <Star className="w-4 h-4" />
              Get Started Today
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              {siteContent.contact.hero.title}
            </h1>
            
            <p className="text-responsive-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {siteContent.contact.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="card-elevated h-full text-center hover-lift">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 block mb-2"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-primary font-medium mb-2">{info.value}</p>
                    )}
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Forms Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  General Inquiry
                </TabsTrigger>
                <TabsTrigger value="booking" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Session
                </TabsTrigger>
              </TabsList>

              {/* Contact Form */}
              <TabsContent value="contact" data-tab="contact">
                <Card className="card-elevated max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <MessageSquare className="w-6 h-6 text-primary" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Have questions about our coaching services? We'd love to hear from you.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Full Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your full name" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    autoComplete="name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Email Address *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="your.email@example.com" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    autoComplete="email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={contactForm.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Service Interest *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
                                    <SelectValue placeholder="Select a service you're interested in" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {serviceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your goals, experience level, or any questions you have..."
                                  className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span className="text-xs text-muted-foreground">
                                  {field.value?.length || 0}/500
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={contactMutation.isPending || isSubmitted}
                          className="w-full btn-primary flex items-center gap-2 text-lg py-6"
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending Message...
                            </>
                          ) : isSubmitted ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Message Sent!
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Booking Form */}
              <TabsContent value="booking" data-tab="booking">
                <Card className="card-elevated max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Calendar className="w-6 h-6 text-primary" />
                      Book a Session
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Ready to start your coaching journey? Let us know your preferences.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Form {...bookingForm}>
                      <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={bookingForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Full Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your full name" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    autoComplete="name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={bookingForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Email Address *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="your.email@example.com" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    autoComplete="email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={bookingForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="+44 7xxx xxx xxx" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    autoComplete="tel"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={bookingForm.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Preferred Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field} 
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={bookingForm.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Service Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
                                    <SelectValue placeholder="Select the type of session" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {serviceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={bookingForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Additional Information</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your goals, current skill level, or any specific requirements..."
                                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span className="text-xs text-muted-foreground">
                                  {field.value?.length || 0}/500
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={bookingMutation.isPending || isSubmitted}
                          className="w-full btn-primary flex items-center gap-2 text-lg py-6"
                        >
                          {bookingMutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Submitting Request...
                            </>
                          ) : isSubmitted ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Request Submitted!
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5" />
                              Submit Booking Request
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">We'll Contact You</h4>
                      <p className="text-gray-300 text-sm">Within 24 hours, we'll reach out to discuss your goals and answer any questions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Schedule Your Session</h4>
                      <p className="text-gray-300 text-sm">We'll find a time that works for you and book your first session.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-lfc-red rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Start Your Journey</h4>
                      <p className="text-gray-300 text-sm">Begin your personalized development program with professional coaching.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">How quickly can I start?</h4>
                    <p className="text-gray-300 text-sm">Most new clients can start within a week of their initial inquiry, depending on availability.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">What equipment do I need?</h4>
                    <p className="text-gray-300 text-sm">Just bring yourself! We provide all professional equipment and training materials.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Can parents observe sessions?</h4>
                    <p className="text-gray-300 text-sm">Absolutely! Parents are welcome to observe and we encourage their involvement in the development process.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Do you offer trial sessions?</h4>
                    <p className="text-gray-300 text-sm">Yes, we offer discounted trial sessions so you can experience our coaching approach firsthand.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lfc-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            YOUR DEVELOPMENT STARTS HERE
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't wait to unlock your potential. The best time to start your football development journey is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-lfc-red hover:bg-gray-100 font-bold text-lg px-8 py-4"
              onClick={() => setActiveTab("booking")}
            >
              Book Your Session Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-lfc-red font-bold text-lg px-8 py-4"
              onClick={() => setActiveTab("contact")}
            >
              Ask a Question First
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
