import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Calendar, 
  User, 
  Bell, 
  CreditCard, 
  Star, 
  Clock, 
  Target,
  LogOut,
  Phone,
  Mail,
  Shield
} from "lucide-react";
import { GdprConsent } from "@/components/gdpr-consent";
import { useLocation } from "wouter";
import { format } from "date-fns";
import type { 
  User as UserType, 
  StudentProgress, 
  ParentNotification, 
  PaymentRecord, 
  Appointment 
} from "@shared/schema";

export default function ParentDashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setLocation("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "parent") {
        setLocation("/login");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      setLocation("/login");
    }
  }, [setLocation]);

  const { data: progress = [] } = useQuery<StudentProgress[]>({
    queryKey: ["/api/parent/progress", user?.id],
    enabled: !!user?.id,
  });

  const { data: notifications = [] } = useQuery<ParentNotification[]>({
    queryKey: ["/api/parent/notifications", user?.id],
    enabled: !!user?.id,
  });

  const { data: payments = [] } = useQuery<PaymentRecord[]>({
    queryKey: ["/api/parent/payments", user?.id],
    enabled: !!user?.id,
  });

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["/api/parent/appointments", user?.id],
    enabled: !!user?.id,
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-almost-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-lfc-red border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const nextAppointment = appointments
    .filter(apt => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-almost-black">
      {/* Header */}
      <div className="bg-almost-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-lfc-red mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Parent Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user.parentName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {unreadNotifications > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-400" />
                  <span className="absolute -top-2 -right-2 bg-lfc-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-almost-black border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{progress.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-white">
                    {progress.length > 0 
                      ? (progress.reduce((sum, p) => sum + (p.rating || 0), 0) / progress.length).toFixed(1)
                      : "N/A"
                    }
                  </p>
                </div>
                <Star className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Next Session</p>
                  <p className="text-lg font-bold text-white">
                    {nextAppointment 
                      ? format(new Date(nextAppointment.date), "MMM dd")
                      : "None scheduled"
                    }
                  </p>
                </div>
                <Clock className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-almost-black border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Notifications</p>
                  <p className="text-2xl font-bold text-white">{unreadNotifications}</p>
                </div>
                <Bell className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Info Card */}
        <Card className="bg-almost-black border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Student Name</p>
                  <p className="text-white font-semibold">{user.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-white">{user.studentAge} years old</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Parent/Guardian</p>
                  <p className="text-white">{user.parentName}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2" />
                  {user.phone}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Emergency Contact</p>
                  <p className="text-white">{user.emergencyContact}</p>
                  <p className="text-gray-300 text-sm">{user.emergencyPhone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="bg-almost-black border border-gray-700">
            <TabsTrigger value="progress" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Progress Reports
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Notifications {unreadNotifications > 0 && `(${unreadNotifications})`}
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Payment History
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Privacy Settings
            </TabsTrigger>
          </TabsList>

          {/* Progress Reports */}
          <TabsContent value="progress">
            <Card className="bg-almost-black border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Session Progress Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {progress.length > 0 ? (
                  <div className="space-y-4">
                    {progress.map((session) => (
                      <div key={session.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {format(new Date(session.sessionDate), "MMMM dd, yyyy")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {format(new Date(session.sessionDate), "EEEE, h:mm a")}
                            </p>
                          </div>
                          {session.rating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white font-semibold">{session.rating}/5</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-medium mb-1">Skills Worked On</h4>
                            <p className="text-gray-300">{session.skillsWorkedOn}</p>
                          </div>
                          
                          {session.coachNotes && (
                            <div>
                              <h4 className="text-white font-medium mb-1">Coach Notes</h4>
                              <p className="text-gray-300">{session.coachNotes}</p>
                            </div>
                          )}
                          
                          {session.nextSessionGoals && (
                            <div>
                              <h4 className="text-white font-medium mb-1 flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                Next Session Goals
                              </h4>
                              <p className="text-gray-300">{session.nextSessionGoals}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No progress reports yet</p>
                    <p className="text-gray-500 text-sm">Progress reports will appear here after your first session</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule */}
          <TabsContent value="schedule">
            <Card className="bg-almost-black border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {appointment.serviceType}
                            </h3>
                            <p className="text-gray-400">
                              {format(new Date(appointment.date), "EEEE, MMMM dd, yyyy 'at' h:mm a")}
                            </p>
                            <p className="text-gray-300 text-sm mt-1">
                              Duration: {appointment.duration} minutes
                            </p>
                          </div>
                          <Badge 
                            variant={appointment.status === "scheduled" ? "default" : "secondary"}
                            className={appointment.status === "scheduled" ? "bg-green-700" : ""}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        {appointment.notes && (
                          <p className="text-gray-300 mt-3">{appointment.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No upcoming sessions</p>
                    <p className="text-gray-500 text-sm">Book a session through our contact form</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="bg-almost-black border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`border rounded-lg p-4 ${
                          notification.isRead ? "border-gray-700" : "border-lfc-red bg-red-950/20"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{notification.title}</h3>
                            <p className="text-gray-300 mt-1">{notification.message}</p>
                            <p className="text-gray-500 text-sm mt-2">
                              {format(new Date(notification.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-lfc-red rounded-full ml-2 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No notifications</p>
                    <p className="text-gray-500 text-sm">You'll receive updates about sessions and progress here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History */}
          <TabsContent value="payments">
            <Card className="bg-almost-black border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length > 0 ? (
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {payment.serviceType}
                            </h3>
                            <p className="text-gray-400">
                              {format(new Date(payment.createdAt), "MMMM dd, yyyy")}
                            </p>
                            {payment.stripePaymentId && (
                              <p className="text-gray-500 text-sm">
                                Payment ID: {payment.stripePaymentId}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-white">
                              £{(payment.amount / 100).toFixed(2)}
                            </p>
                            <Badge 
                              variant={payment.status === "completed" ? "default" : "secondary"}
                              className={payment.status === "completed" ? "bg-green-700" : ""}
                            >
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No payment history</p>
                    <p className="text-gray-500 text-sm">Your payment history will appear here after making payments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <GdprConsent 
              userId={user.id}
              currentConsents={{
                gdprConsent: user.gdprConsent || false,
                dataProcessingConsent: user.dataProcessingConsent || false,
                marketingConsent: user.marketingConsent || false,
                gdprConsentDate: user.gdprConsentDate ? user.gdprConsentDate.toString() : undefined,
              }}
              onConsentUpdate={() => {
                // Optionally refresh user data or show success message
                console.log("Consent updated");
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}