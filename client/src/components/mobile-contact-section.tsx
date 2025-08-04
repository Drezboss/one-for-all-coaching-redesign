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
import { insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Calendar, User, MessageSquare, Send } from "lucide-react";

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

export function MobileContactSection() {
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
        description: "Call +44 7750 887112 to book your session",
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

  return (
    <section className="py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            GET IN <span className="text-lfc-red">TOUCH</span>
          </h2>
          <p className="text-lg text-gray-300">Ready to start your football development journey?</p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-4 text-center">
              <Phone className="w-6 h-6 text-lfc-red mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Phone</h3>
              <a 
                href="tel:+447750887112" 
                className="text-gray-300 hover:text-lfc-red transition-colors"
              >
                +44 7750 887112
              </a>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-4 text-center">
              <Mail className="w-6 h-6 text-lfc-red mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <a 
                href="mailto:dave@all-4one-coaching.com" 
                className="text-gray-300 hover:text-lfc-red transition-colors"
              >
                dave@all-4one-coaching.com
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Forms */}
        <Card className="bg-almost-black border-gray-800">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="contact" className="text-sm">General Contact</TabsTrigger>
                <TabsTrigger value="booking" className="text-sm">Book Session</TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Your full name"
                              className="bg-black border-gray-700 text-white placeholder-gray-400 h-12"
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
                              placeholder="your.email@example.com"
                              className="bg-black border-gray-700 text-white placeholder-gray-400 h-12"
                            />
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
                          <FormLabel className="text-white">Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Tell us about your football development goals..."
                              className="bg-black border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-lfc-red text-white hover:bg-bright-red font-semibold py-4 min-h-[44px]"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="booking">
                <Form {...bookingForm}>
                  <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                    <FormField
                      control={bookingForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Your full name"
                              className="bg-black border-gray-700 text-white placeholder-gray-400 h-12"
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
                              placeholder="your.email@example.com"
                              className="bg-black border-gray-700 text-white placeholder-gray-400 h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={bookingForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel"
                              placeholder="+44 7750 887112"
                              className="bg-black border-gray-700 text-white placeholder-gray-400 h-12"
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
                              <SelectTrigger className="bg-black border-gray-700 text-white h-12">
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

                    <FormField
                      control={bookingForm.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Preferred Date (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="date"
                              className="bg-black border-gray-700 text-white h-12"
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
                          <FormLabel className="text-white">Additional Details (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Any specific requirements or questions..."
                              className="bg-black border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-lfc-red text-white hover:bg-bright-red font-semibold py-4 min-h-[44px]"
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          Request Booking
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Direct Contact CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-300 mb-4">
            For immediate assistance, call us directly:
          </p>
          <a 
            href="tel:+447750887112"
            className="inline-flex items-center bg-lfc-red text-white hover:bg-bright-red font-bold py-4 px-8 rounded-md transition-colors min-h-[44px]"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call +44 7750 887112
          </a>
        </div>
      </div>
    </section>
  );
}