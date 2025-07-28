import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar, Users, MessageSquare, Settings, LogOut, Clock, Mail, Phone, Reply, Send } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import type { ContactSubmission, BookingInquiry, Appointment } from "@shared/schema";

const replySchema = z.object({
  message: z.string().min(10, "Reply must be at least 10 characters"),
});

type ReplyFormData = z.infer<typeof replySchema>;

export default function Admin() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setLocation("/login");
      return;
    }
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      setLocation("/login");
    }
  }, [setLocation]);

  const { data: contacts = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: bookings = [] } = useQuery<BookingInquiry[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const replyForm = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      message: "",
    },
  });

  const replyMutation = useMutation({
    mutationFn: (data: { contactId: number; message: string; recipientEmail: string; recipientName: string }) =>
      apiRequest("POST", "/api/reply-message", data),
    onSuccess: () => {
      toast({
        title: "Reply Sent!",
        description: "Your message has been sent successfully.",
      });
      setReplyDialogOpen(false);
      setSelectedContact(null);
      replyForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send",
        description: error.message || "Could not send reply. Please try again.",
        variant: "destructive",
      });
    },
  });

  const openReplyDialog = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setReplyDialogOpen(true);
  };

  const onReplySubmit = (data: ReplyFormData) => {
    if (!selectedContact) return;
    
    replyMutation.mutate({
      contactId: selectedContact.id,
      message: data.message,
      recipientEmail: selectedContact.email,
      recipientName: selectedContact.name,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/");
  };

  if (!user) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-almost-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-lfc-red rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                COACH <span className="text-lfc-red">DASHBOARD</span>
              </h1>
              <p className="text-gray-300">Welcome back, {user.firstName || user.username}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Today's Sessions</p>
                  <p className="text-2xl font-bold text-lfc-red">{todayAppointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Appointments</p>
                  <p className="text-2xl font-bold text-lfc-red">{appointments.length}</p>
                </div>
                <Users className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Messages</p>
                  <p className="text-2xl font-bold text-lfc-red">{contacts.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Booking Inquiries</p>
                  <p className="text-2xl font-bold text-lfc-red">{bookings.length}</p>
                </div>
                <Clock className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-almost-black border border-gray-800">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-lfc-red">
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-lfc-red">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-lfc-red">
              <Users className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card className="bg-almost-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No appointments scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">{appointment.clientName}</h3>
                            <p className="text-gray-300">{appointment.serviceType}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {format(new Date(appointment.date), "MMM dd, yyyy")}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {format(new Date(appointment.date), "HH:mm")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {appointment.clientEmail}
                              </span>
                              {appointment.clientPhone && (
                                <span className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {appointment.clientPhone}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge 
                            variant={appointment.status === "scheduled" ? "default" : "secondary"}
                            className={appointment.status === "scheduled" ? "bg-lfc-red" : ""}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-almost-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No messages received</p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                            <span className="text-sm text-gray-400">
                              {format(new Date(contact.createdAt), "MMM dd, HH:mm")}
                            </span>
                          </div>
                          <p className="text-gray-300">{contact.email}</p>
                          {contact.service && (
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {contact.service}
                            </Badge>
                          )}
                          <p className="text-gray-200 mt-3">{contact.message}</p>
                          <div className="flex justify-end mt-4">
                            <Button
                              size="sm"
                              onClick={() => openReplyDialog(contact)}
                              className="bg-lfc-red hover:bg-bright-red text-white"
                            >
                              <Reply className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="bg-almost-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Booking Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No booking inquiries</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-white">{booking.name}</h3>
                            <span className="text-sm text-gray-400">
                              {format(new Date(booking.createdAt), "MMM dd, HH:mm")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {booking.email}
                            </span>
                            {booking.phone && (
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {booking.phone}
                              </span>
                            )}
                          </div>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {booking.serviceType}
                          </Badge>
                          {booking.preferredDate && (
                            <p className="text-gray-300">
                              Preferred Date: {booking.preferredDate}
                            </p>
                          )}
                          {booking.message && (
                            <p className="text-gray-200 mt-3">{booking.message}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reply Dialog */}
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent className="bg-almost-black border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">
                Reply to {selectedContact?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedContact && (
              <div className="space-y-4">
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">Original Message:</h4>
                  <p className="text-gray-300 text-sm">{selectedContact.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                    <span>{selectedContact.email}</span>
                    <span>{format(new Date(selectedContact.createdAt), "MMM dd, HH:mm")}</span>
                  </div>
                </div>

                <Form {...replyForm}>
                  <form onSubmit={replyForm.handleSubmit(onReplySubmit)} className="space-y-4">
                    <FormField
                      control={replyForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Your Reply</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Type your reply message here..."
                              className="bg-black border-gray-700 text-white focus:border-lfc-red min-h-32"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setReplyDialogOpen(false)}
                        className="border-gray-600 text-white hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-lfc-red hover:bg-bright-red text-white"
                        disabled={replyMutation.isPending}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {replyMutation.isPending ? "Sending..." : "Send Reply"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}