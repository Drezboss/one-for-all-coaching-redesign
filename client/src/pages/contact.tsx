import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
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
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare, ArrowRight, Star, CheckCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const bookingFormSchema = insertBookingSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type BookingFormData = z.infer<typeof bookingFormSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function Contact() {
  const [activeTab, setActiveTab] = useState("contact");
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
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
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Static site - no backend API calls
      console.log("Contact form submission:", data);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Received!",
        description: "Thank you for your interest. Please call us directly at +44 7750 887112 for immediate assistance.",
      });
      contactForm.reset();
    },
    onError: () => {
      toast({
        title: "Please Contact Us Directly",
        description: "Call +44 7750 887112 or email dave@all-4one-coaching.com",
        variant: "destructive",
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      // Static site - no backend API calls
      console.log("Booking form submission:", data);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Booking Interest Noted!",
        description: "Please call us at +44 7750 887112 to discuss availability and book your session.",
      });
      bookingForm.reset();
    },
    onError: () => {
      toast({
        title: "Please Contact Us Directly",
        description: "Call +44 7750 887112 to book your session.",
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
      value: "dave@all-4one-coaching.com",
      description: "Get in touch via email",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 7750 887112",
      description: "Call us directly",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Liverpool, UK",
      description: "Available Online & In Person",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "We'll get back to you quickly",
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-black via-dark-navy to-almost-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-lfc-red via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-padding text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lfc-red to-bright-red rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-responsive-xl font-black text-white mb-6">
              <span className="text-gradient">CONTACT</span> US
            </h1>
            <h2 className="text-responsive-lg font-bold text-white mb-6">
              Let's Build Your Next Step Together.
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to unlock your potential? Get in touch and let's discuss how we can help you become the best version of yourself.
            </p>
            <motion.blockquote 
              className="text-2xl lg:text-3xl italic text-gray-200 mb-4 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-lfc-red to-bright-red rounded-full"></div>
              "Your journey is unique. Your development should be too."
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-almost-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black border-gray-800 hover:border-lfc-red transition-all duration-300 card-hover group">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-lfc-red transition-colors duration-300">
                      {info.title}
                    </h3>
                    <div className="text-lfc-red font-bold mb-1 group-hover:text-bright-red transition-colors duration-300">
                      {info.value}
                    </div>
                    <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {info.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto container-padding">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-xl font-black text-white mb-6">
              GET IN <span className="text-gradient">TOUCH</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-300">Choose how you'd like to connect with us</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-almost-black border border-gray-800 p-1 rounded-xl">
                <TabsTrigger 
                  value="contact" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lfc-red data-[state=active]:to-bright-red data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  General Inquiry
                </TabsTrigger>
                <TabsTrigger 
                  value="booking" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lfc-red data-[state=active]:to-bright-red data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Session
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="mt-8">
                <Card className="bg-almost-black border-gray-800">
                  <CardContent className="p-8">
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400"
                                    placeholder="Your full name"
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
                                <FormLabel className="text-white">Email *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email"
                                    className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400"
                                    placeholder="your.email@example.com"
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
                              <FormLabel className="text-white">Service Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="form-input-enhanced bg-black border-gray-700 text-white">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black border-gray-700">
                                  <SelectItem value="1-2-1">1-2-1 Individual Coaching</SelectItem>
                                  <SelectItem value="group">Group Sessions</SelectItem>
                                  <SelectItem value="coach-education">Coach Education</SelectItem>
                                  <SelectItem value="mentorship">Coach Mentorship</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
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
                              <FormLabel className="text-white">Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                                  placeholder="Tell us about your goals and how we can help..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full btn-primary text-lg py-6 group"
                            disabled={contactMutation.isPending}
                          >
                            {contactMutation.isPending ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Sending...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                Send Message
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="booking" className="mt-8">
                <Card className="bg-almost-black border-gray-800">
                  <CardContent className="p-8">
                    <Form {...bookingForm}>
                      <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={bookingForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400"
                                    placeholder="Your full name"
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
                                <FormLabel className="text-white">Email *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email"
                                    className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400"
                                    placeholder="your.email@example.com"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={bookingForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400"
                                    placeholder="+44 7750 887112"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={bookingForm.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Service Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="form-input-enhanced bg-black border-gray-700 text-white">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-black border-gray-700">
                                    <SelectItem value="1-2-1">1-2-1 Individual Coaching</SelectItem>
                                    <SelectItem value="group">Group Sessions</SelectItem>
                                    <SelectItem value="coach-education">Coach Education</SelectItem>
                                    <SelectItem value="mentorship">Coach Mentorship</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={bookingForm.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Preferred Date</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="date"
                                  className="form-input-enhanced bg-black border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={bookingForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Additional Information</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="form-input-enhanced bg-black border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                                  placeholder="Tell us about your goals, experience level, and any specific requirements..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full btn-primary text-lg py-6 group"
                            disabled={bookingMutation.isPending}
                          >
                            {bookingMutation.isPending ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Processing...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                Request Booking
                              </div>
                            )}
                          </Button>
                        </motion.div>
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
