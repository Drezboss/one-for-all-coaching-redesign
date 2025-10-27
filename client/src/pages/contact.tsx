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
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare, CheckCircle } from "lucide-react";

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
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+123-456-7890",
      description: "Call us directly",
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
            GET IN <span className="text-lfc-red">TOUCH</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to unlock your potential? Get in touch and let's discuss how we can help you become the best version of yourself.
          </p>
          <div className="text-center">
            <blockquote className="text-2xl italic text-gray-200 mb-4">
              "Your journey is unique. Your development should be too."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-almost-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-lfc-red transition-colors duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-lfc-red rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                  <div className="text-lfc-red font-bold mb-1">{info.value}</div>
                  <div className="text-gray-400 text-sm">{info.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              GET IN <span className="text-lfc-red">TOUCH</span>
            </h2>
                          <p className="text-xl text-gray-600">Choose how you'd like to connect with us</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-gray-200">
                              <TabsTrigger 
                  value="contact" 
                  className="data-[state=active]:bg-lfc-red data-[state=active]:text-white text-gray-600"
                >
                <MessageSquare className="w-4 h-4 mr-2" />
                General Inquiry
              </TabsTrigger>
                              <TabsTrigger 
                  value="booking" 
                  className="data-[state=active]:bg-lfc-red data-[state=active]:text-white text-gray-600"
                >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="mt-8">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8">
                  <div className="mb-6" id="contact-form">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                                          <p className="text-gray-600">Have questions about our services? Want to learn more about our coaching approach? Drop us a message and we'll get back to you.</p>
                  </div>

                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 font-semibold">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                              <FormLabel className="text-gray-900 font-semibold">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                            <FormLabel className="text-gray-900 font-semibold">Service Interest (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black border-gray-700">
                                <SelectItem value="individual">1-2-1 Individual Coaching</SelectItem>
                                <SelectItem value="group">Group Sessions</SelectItem>
                                <SelectItem value="education">Coach Education</SelectItem>
                                <SelectItem value="mentorship">Coach Mentorship</SelectItem>
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
                            <FormLabel className="text-gray-900 font-semibold">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Tell us about your goals and how we can help..."
                                className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="btn-primary w-full bg-lfc-red text-white hover:bg-bright-red font-bold text-lg py-4 transition-all duration-200"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" className="mt-8">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book a Session</h3>
                                          <p className="text-gray-600">Ready to start your development journey? Fill out this form and we'll contact you within 24 hours to schedule your session.</p>
                  </div>

                  <Form {...bookingForm}>
                    <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={bookingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 font-semibold">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                              <FormLabel className="text-gray-900 font-semibold">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                              <FormLabel className="text-gray-900 font-semibold">Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your phone number"
                                  className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                              <FormLabel className="text-gray-900 font-semibold">Service Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red">
                                    <SelectValue placeholder="Select service type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black border-gray-700">
                                  <SelectItem value="individual">1-2-1 Individual Coaching</SelectItem>
                                  <SelectItem value="group">Group Sessions</SelectItem>
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
                            <FormLabel className="text-gray-900 font-semibold">Preferred Date/Time (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g., Weekday evenings, Saturday mornings"
                                className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
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
                            <FormLabel className="text-gray-900 font-semibold">Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                placeholder="Tell us about your current level, goals, or any specific requirements..."
                                className="bg-gray-900 text-white border-gray-700 focus:border-lfc-red"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={bookingMutation.isPending}
                        className="btn-primary w-full bg-lfc-red text-white hover:bg-bright-red font-bold text-lg py-4 transition-all duration-200"
                      >
                        {bookingMutation.isPending ? "Submitting..." : "Submit Booking Inquiry"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
                          </TabsContent>
            </Tabs>

            {/* Quick Contact Info */}
            <Card className="bg-gray-50 border-gray-200 mt-8">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Call/Text</p>
                      <a href={`tel:${contact.phone}`} className="text-lg font-semibold text-gray-900 hover:text-lfc-red">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-lg font-semibold text-gray-900 hover:text-lfc-red">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-lfc-red rounded-full flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Social Media</p>
                      <a href={contact.socialMedia} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-lfc-red">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
              FREQUENTLY ASKED <span className="text-lfc-red">QUESTIONS</span>
            </h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white border-gray-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
              HOW TO <span className="text-lfc-red">BOOK</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {["Get in Touch", "Discuss Your Needs", "Schedule Sessions", "Start Training"].map((step, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{step}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

              {/* Additional Info */}
        <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-lfc-red flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      1. Quick Response
                    </h4>
                    <p className="text-gray-600 text-sm">Within 24 hours, we'll reach out to discuss your goals and answer any questions.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-lfc-red flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      2. Personalized Consultation
                    </h4>
                    <p className="text-gray-600 text-sm">We'll find a time that works for you and book your first session.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-lfc-red flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      3. Start Your Journey
                    </h4>
                    <p className="text-gray-600 text-sm">Begin your personalized development program with professional coaching.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">How quickly can I start?</p>
                    <p className="text-gray-600 text-sm">Most new clients can start within a week of their initial inquiry, depending on availability.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">What do I need to bring?</p>
                    <p className="text-gray-600 text-sm">Just bring yourself! We provide all professional equipment and training materials.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Can parents watch sessions?</p>
                    <p className="text-gray-600 text-sm">Absolutely! Parents are welcome to observe and we encourage their involvement in the development process.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Do you offer trial sessions?</p>
                    <p className="text-gray-600 text-sm">Yes, we offer discounted trial sessions so you can experience our coaching approach firsthand.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            READY TO START YOUR <span className="text-lfc-red">JOURNEY</span>?
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
              className="border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-4"
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
