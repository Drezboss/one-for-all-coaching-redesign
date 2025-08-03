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
import { Calendar, Users, MessageSquare, Settings, LogOut, Clock, Mail, Phone, Reply, Send, Shield, Activity, UserPlus } from "lucide-react";
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
    return <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-gray-900">Loading...</div>
    </div>;
  }

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-lfc-red mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">DC Football Coaching Admin</h1>
              <p className="text-sm text-gray-600">Welcome, {user.username}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-gray-200 text-gray-900 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Registrations</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {registrationsQuery.data?.length || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bookings This Month</p>
                  <p className="text-3xl font-bold text-gray-900">
// ... existing code ...
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-3xl font-bold text-gray-900">
// ... existing code ...
        {/* Recent Activity */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-600">Latest registrations and bookings</CardDescription>
// ... existing code ...
                <TabsTrigger value="registrations" className="text-gray-900">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrations ({registrationsQuery.data?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="bookings" className="text-gray-900">
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings ({bookingsQuery.data?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="contacts" className="text-gray-900">
                  <Mail className="w-4 h-4 mr-2" />
                  Contacts ({contactsQuery.data?.length || 0})
                </TabsTrigger>
// ... existing code ...
                      <TableHead className="text-gray-600">Student</TableHead>
                      <TableHead className="text-gray-600">Parent</TableHead>
                      <TableHead className="text-gray-600">Email</TableHead>
                      <TableHead className="text-gray-600">Phone</TableHead>
                      <TableHead className="text-gray-600">Age</TableHead>
                      <TableHead className="text-gray-600">Date</TableHead>
// ... existing code ...
                        <TableCell className="text-gray-900">{registration.studentName}</TableCell>
                        <TableCell className="text-gray-900">{registration.parentName}</TableCell>
                        <TableCell className="text-gray-900">{registration.email}</TableCell>
                        <TableCell className="text-gray-900">{registration.phone}</TableCell>
                        <TableCell className="text-gray-900">{registration.studentAge}</TableCell>
                        <TableCell className="text-gray-600 text-sm">
// ... existing code ...
                      <TableHead className="text-gray-600">Name</TableHead>
                      <TableHead className="text-gray-600">Email</TableHead>
                      <TableHead className="text-gray-600">Phone</TableHead>
                      <TableHead className="text-gray-600">Service</TableHead>
                      <TableHead className="text-gray-600">Preferred Time</TableHead>
                      <TableHead className="text-gray-600">Date</TableHead>
// ... existing code ...
                        <TableCell className="text-gray-900">{booking.name}</TableCell>
                        <TableCell className="text-gray-900">{booking.email}</TableCell>
                        <TableCell className="text-gray-900">{booking.phone || 'N/A'}</TableCell>
                        <TableCell className="text-gray-900">{booking.serviceType}</TableCell>
                        <TableCell className="text-gray-900">{booking.preferredDate || 'Flexible'}</TableCell>
                        <TableCell className="text-gray-600 text-sm">
// ... existing code ...
                      <TableHead className="text-gray-600">Name</TableHead>
                      <TableHead className="text-gray-600">Email</TableHead>
                      <TableHead className="text-gray-600">Service</TableHead>
                      <TableHead className="text-gray-600">Message</TableHead>
                      <TableHead className="text-gray-600">Date</TableHead>
// ... existing code ...
                        <TableCell className="text-gray-900">{contact.name}</TableCell>
                        <TableCell className="text-gray-900">{contact.email}</TableCell>
                        <TableCell className="text-gray-900">{contact.service || 'General Inquiry'}</TableCell>
                        <TableCell className="text-gray-900 max-w-xs truncate">{contact.message}</TableCell>
                        <TableCell className="text-gray-600 text-sm">
// ... existing code ...