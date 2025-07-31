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
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare } from "lucide-react";
import { siteContent } from "@shared/content";

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
      return apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      contactForm.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Booking request sent!",
        description: "We'll contact you within 24 hours to confirm your booking.",
      });
      bookingForm.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--apd-blue)] to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              GET IN TOUCH
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Ready to enter the next level? Contact us today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                <a href={`tel:${siteContent.site.phone}`} className="text-[var(--apd-blue)] hover:underline text-lg">
                  {siteContent.site.phone}
                </a>
                <p className="text-gray-600 mt-2">Mon-Fri 9am-6pm</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                <a href={`mailto:${siteContent.site.email}`} className="text-[var(--apd-blue)] hover:underline">
                  {siteContent.site.email}
                </a>
                <p className="text-gray-600 mt-2">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[var(--apd-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600">Chatham, Kent</p>
                <p className="text-gray-600">Eltham, SE London</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">General Enquiry</TabsTrigger>
              <TabsTrigger value="booking">Book a Session</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                  
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit((data) => contactMutation.mutate(data))} className="space-y-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What is your enquiry about?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your enquiry..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Session</h2>
                  
                  <Form {...bookingForm}>
                    <form onSubmit={bookingForm.handleSubmit((data) => bookingMutation.mutate(data))} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={bookingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Player Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Player's full name" {...field} />
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
                              <FormLabel>Parent/Guardian Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="parent@example.com" {...field} />
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
                              <FormLabel>Contact Number (Optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="07123 456789" {...field} />
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
                              <FormLabel>Service Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="training-centre">Training Centre Sessions</SelectItem>
                                  <SelectItem value="121-coaching">121 Coaching</SelectItem>
                                  <SelectItem value="team-training">Team Training</SelectItem>
                                  <SelectItem value="goalkeeper">Goalkeeper Academy</SelectItem>
                                  <SelectItem value="holiday-camp">Holiday Camp</SelectItem>
                                  <SelectItem value="post-16">Post-16 Academy</SelectItem>
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
                            <FormLabel>Preferred Start Date (Optional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
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
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about the player's age, experience level, or any specific requirements..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-[var(--apd-blue)] text-white hover:bg-[var(--apd-light-blue)] font-bold"
                        disabled={bookingMutation.isPending}
                      >
                        {bookingMutation.isPending ? "Sending..." : "Submit Booking Request"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What age groups do you cater for?</h3>
                <p className="text-gray-600">We offer programmes for all age groups from U7s through to U18s, with age-appropriate training at every level.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Do you offer trial sessions?</h3>
                <p className="text-gray-600">Yes! We offer a free trial session for new players to experience the APD way before committing to regular training.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What should players bring to training?</h3>
                <p className="text-gray-600">Players should bring appropriate football boots, shin pads, water bottle, and weather-appropriate training kit.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">How do I book a place?</h3>
                <p className="text-gray-600">You can book through the form above, call us directly, or email us. We'll confirm your booking within 24 hours.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
