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
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare, ArrowRight, CheckCircle, Loader2, Star } from "lucide-react";

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
      value: "info@oneforallcoaching.com",
      description: "Get in touch via email",
      href: "mailto:info@oneforallcoaching.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 7750 887112",
      description: "Call us directly",
      href: "tel:+447750887112",
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-black via-dark-navy to-almost-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-medium text-white/90">
            <Star className="w-4 h-4 text-lfc-red" />
            GET IN TOUCH
            <Star className="w-4 h-4 text-lfc-red" />
          </div>
          <h1 className="text-hero text-white mb-6">
            LET'S <span className="text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">CONNECT</span>
          </h1>
          <h2 className="text-display text-white/90 mb-6">
            Build Your Next Step Together
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to unlock your potential? Get in touch and let's discuss how we can help you become the best version of yourself.
          </p>
          <div className="relative inline-block">
            <blockquote className="text-xl lg:text-2xl italic text-gray-200 mb-4 relative">
              <div className="absolute -top-2 -left-2 text-2xl text-lfc-red/20">"</div>
              <span className="px-4">"Your journey is unique. Your development should be too."</span>
              <div className="absolute -bottom-2 -right-2 text-2xl text-lfc-red/20 rotate-180">"</div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="group bg-black/50 border-gray-800/50 hover:border-lfc-red/50 transition-all duration-300 card-hover backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-lfc-red to-bright-red rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-lfc-red/25">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-lfc-red/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-lfc-red transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="text-lfc-red font-semibold mb-2">
                    {info.href ? (
                      <a href={info.href} className="hover:text-bright-red transition-colors duration-300">
                        {info.value}
                      </a>
                    ) : (
                      info.value
                    )}
                  </div>
                  <div className="text-gray-400 text-sm">{info.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Forms */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display text-white mb-6">
              GET IN <span className="text-lfc-red bg-gradient-to-r from-lfc-red to-bright-red bg-clip-text text-transparent">TOUCH</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">Choose how you'd like to connect with us</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-almost-black/80 border border-gray-800/50 rounded-xl p-2 backdrop-blur-sm">
              <TabsTrigger 
                value="contact" 
                className="data-[state=active]:bg-lfc-red data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-300 font-medium"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                General Inquiry
              </TabsTrigger>
              <TabsTrigger 
                value="booking" 
                className="data-[state=active]:bg-lfc-red data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-300 font-medium"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="mt-8">
              <Card className="bg-almost-black/80 border-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-12">
                  <div className="mb-8" id="contact-form">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Send us a Message</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Have questions about our services? Want to learn more about our coaching approach? Drop us a message and we'll get back to you.
                    </p>
                  </div>

                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-base">
                                Full Name <span className="text-lfc-red">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-base">
                                Email Address <span className="text-lfc-red">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={contactForm.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold text-base">
                              Service Interest
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red h-12 text-base">
                                  <SelectValue placeholder="Select a service you're interested in" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black border-gray-700">
                                <SelectItem value="individual-coaching">1-2-1 Individual Coaching</SelectItem>
                                <SelectItem value="group-sessions">Group Sessions</SelectItem>
                                <SelectItem value="coach-education">Coach Education</SelectItem>
                                <SelectItem value="coach-mentorship">Coach Mentorship</SelectItem>
                                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold text-base">
                              Message <span className="text-lfc-red">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Tell us about your goals, experience level, or any questions you have..."
                                className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 min-h-[120px] text-base transition-all duration-300 resize-none"
                                rows={5}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={contactMutation.isPending}
                        className="w-full bg-lfc-red hover:bg-lfc-red/90 text-white font-bold text-lg py-6 h-auto transition-all duration-300 hover:shadow-lg hover:shadow-lfc-red/25 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">Send Message</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" className="mt-8">
              <Card className="bg-almost-black/80 border-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Book a Session</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Ready to get started? Tell us about your goals and preferred session type, and we'll get back to you with availability.
                    </p>
                  </div>

                  <Form {...bookingForm}>
                    <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={bookingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-base">
                                Full Name <span className="text-lfc-red">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={bookingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-base">
                                Email Address <span className="text-lfc-red">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
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
                              <FormLabel className="text-white font-semibold text-base">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="+44 7XXX XXXXXX"
                                  className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={bookingForm.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-base">
                                Service Type <span className="text-lfc-red">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red h-12 text-base">
                                    <SelectValue placeholder="Select service type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black border-gray-700">
                                  <SelectItem value="individual-coaching">1-2-1 Individual Coaching</SelectItem>
                                  <SelectItem value="group-sessions">Group Sessions</SelectItem>
                                  <SelectItem value="coach-education">Coach Education</SelectItem>
                                  <SelectItem value="coach-mentorship">Coach Mentorship</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={bookingForm.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold text-base">
                              Preferred Date/Time
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g., Weekday evenings, Saturday mornings, or specific date"
                                className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 h-12 text-base transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookingForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold text-base">
                              Additional Information
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Tell us about your current level, goals, any specific areas you'd like to work on..."
                                className="bg-black/50 border-gray-700/50 text-white focus:border-lfc-red focus:ring-lfc-red/20 min-h-[120px] text-base transition-all duration-300 resize-none"
                                rows={5}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={bookingMutation.isPending}
                        className="w-full bg-lfc-red hover:bg-lfc-red/90 text-white font-bold text-lg py-6 h-auto transition-all duration-300 hover:shadow-lg hover:shadow-lfc-red/25 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {bookingMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">Request Booking</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Direct Contact CTA */}
          <div className="mt-16 text-center">
            <div className="glass p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Prefer to Talk Directly?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                For immediate assistance or to discuss your needs in detail, give us a call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+447750887112">
                  <Button className="bg-lfc-red hover:bg-lfc-red/90 text-white font-semibold px-8 py-3">
                    <Phone className="w-5 h-5 mr-2" />
                    Call +44 7750 887112
                  </Button>
                </a>
                <a href="mailto:info@oneforallcoaching.com">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
