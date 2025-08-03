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
  Shield,
  TrendingUp,
  FileText,
  MessageSquare
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
import { cn } from "@/lib/utils";
import { CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ParentDashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<UserType | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-lfc-red border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const nextAppointment = appointments
    .filter(apt => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const progressReports = progress.map(p => ({
    id: p.id,
    sessionType: p.serviceType,
    date: p.sessionDate,
    summary: p.coachNotes || "No notes provided.",
    rating: p.rating || 0,
    coachName: p.coachName,
    strengths: p.skillsWorkedOn ? p.skillsWorkedOn.split(',').map(s => s.trim()) : [],
    areasToImprove: p.nextSessionGoals ? p.nextSessionGoals.split(',').map(s => s.trim()) : [],
  }));

  const messages = [
    { id: 1, sender: 'coach', senderName: 'Coach Smith', content: 'Hello! How was your session today?', timestamp: '2023-10-26T10:00:00Z' },
    { id: 2, sender: 'parent', senderName: 'You', content: 'Hi Coach, it was great!', timestamp: '2023-10-26T10:05:00Z' },
    { id: 3, sender: 'coach', senderName: 'Coach Smith', content: 'That\'s wonderful to hear!', timestamp: '2023-10-26T10:10:00Z' },
  ];

  const logout = () => {
    handleLogout();
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.firstName || user.username}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-6 h-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-lfc-red text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <Button 
                onClick={logout} 
                variant="outline"
                className="border-gray-200 text-gray-900 hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-600 text-center">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b border-gray-200 hover:bg-gray-50",
                    !notification.isRead && "bg-blue-50"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    {notification.type === 'appointment' && <Calendar className="w-5 h-5 text-lfc-red mt-0.5" />}
                    {notification.type === 'session' && <Clock className="w-5 h-5 text-blue-500 mt-0.5" />}
                    {notification.type === 'message' && <MessageSquare className="w-5 h-5 text-green-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Session</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {nextAppointment ? format(new Date(nextAppointment.date), "MMM d") : "None scheduled"}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-lfc-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-lg font-semibold text-gray-900">{appointments.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progress Reports</p>
                  <p className="text-lg font-semibold text-gray-900">{progressReports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages</p>
                  <p className="text-lg font-semibold text-gray-900">{messages.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-100 border border-gray-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Progress
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-lfc-red data-[state=active]:text-white">
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Upcoming Sessions */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.filter(apt => new Date(apt.date) > new Date()).length === 0 ? (
                  <p className="text-gray-600">No upcoming sessions scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {appointments
                      .filter(apt => new Date(apt.date) > new Date())
                      .slice(0, 3)
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.serviceType}</h4>
                            <p className="text-sm text-gray-600">
                              {format(new Date(appointment.date), "EEEE, MMMM d 'at' h:mm a")}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Confirmed
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Progress */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {progressReports.length === 0 ? (
                  <p className="text-gray-600">No progress reports yet</p>
                ) : (
                  <div className="space-y-4">
                    {progressReports.slice(0, 2).map((report) => (
                      <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{report.sessionType}</h4>
                          <span className="text-sm text-gray-600">
                            {format(new Date(report.date), "MMM d, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{report.summary}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 ml-1">Rating: {report.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">All Sessions</CardTitle>
                <CardDescription className="text-gray-600">View and manage your child's training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600">Date</TableHead>
                      <TableHead className="text-gray-600">Type</TableHead>
                      <TableHead className="text-gray-600">Coach</TableHead>
                      <TableHead className="text-gray-600">Status</TableHead>
                      <TableHead className="text-gray-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="text-gray-900">
                          {format(new Date(appointment.date), "MMM d, yyyy h:mm a")}
                        </TableCell>
                        <TableCell className="text-gray-900">{appointment.serviceType}</TableCell>
                        <TableCell className="text-gray-900">{appointment.coachName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={appointment.status === 'completed' ? 'default' : 'outline'}
                            className={cn(
                              appointment.status === 'completed' && "bg-green-100 text-green-700",
                              appointment.status === 'scheduled' && "bg-blue-100 text-blue-700",
                              appointment.status === 'cancelled' && "bg-red-100 text-red-700"
                            )}
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-100">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Progress Reports</CardTitle>
                <CardDescription className="text-gray-600">Track your child's development and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                {progressReports.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No progress reports available yet</p>
                ) : (
                  <div className="space-y-6">
                    {progressReports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{report.sessionType}</h3>
                            <p className="text-sm text-gray-600">
                              {format(new Date(report.date), "EEEE, MMMM d, yyyy")}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-5 h-5",
                                  i < report.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Session Summary</h4>
                            <p className="text-gray-700">{report.summary}</p>
                          </div>

                          {report.strengths && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
                              <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {report.strengths.map((strength, index) => (
                                  <li key={index}>{strength}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {report.areasToImprove && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Areas to Improve</h4>
                              <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {report.areasToImprove.map((area, index) => (
                                  <li key={index}>{area}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                              Coach: <span className="font-semibold text-gray-900">{report.coachName}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Messages</CardTitle>
                <CardDescription className="text-gray-600">Communication with your coach</CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 rounded-lg",
                          message.sender === 'coach' ? "bg-gray-50 ml-8" : "bg-blue-50 mr-8"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {message.sender === 'coach' ? message.senderName : 'You'}
                          </span>
                          <span className="text-xs text-gray-600">
                            {format(new Date(message.timestamp), "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}