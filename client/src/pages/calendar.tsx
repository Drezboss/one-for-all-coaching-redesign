import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Calendar from 'react-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Mail, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfDay, endOfDay } from "date-fns";
import type { Appointment } from "@shared/schema";
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  // Filter appointments for selected date
  const dayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const selected = startOfDay(selectedDate);
    return aptDate >= selected && aptDate < endOfDay(selected);
  });

  // Get dates that have appointments for calendar highlighting
  const appointmentDates = appointments.map(apt => 
    startOfDay(new Date(apt.date)).getTime()
  );

  const tileClassName = ({ date }: { date: Date }) => {
    const dateTime = startOfDay(date).getTime();
    if (appointmentDates.includes(dateTime)) {
      return 'has-appointment';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-almost-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black">
            COACHING <span className="text-lfc-red">CALENDAR</span>
          </h1>
          <p className="text-gray-300">Manage your training sessions and appointments</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-almost-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Session Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="calendar-container">
                  <style>{`
                    .calendar-container .react-calendar {
                      background: #000;
                      border: 1px solid #374151;
                      border-radius: 8px;
                      color: white;
                      width: 100%;
                    }
                    .calendar-container .react-calendar__tile {
                      background: #111;
                      color: white;
                      border: 1px solid #374151;
                    }
                    .calendar-container .react-calendar__tile:hover {
                      background: #1f2937;
                    }
                    .calendar-container .react-calendar__tile--active {
                      background: #C8102E !important;
                      color: white;
                    }
                    .calendar-container .react-calendar__tile.has-appointment {
                      background: #7f1d1d;
                      border: 1px solid #C8102E;
                    }
                    .calendar-container .react-calendar__navigation button {
                      background: #111;
                      color: white;
                      border: 1px solid #374151;
                    }
                    .calendar-container .react-calendar__navigation button:hover {
                      background: #1f2937;
                    }
                  `}</style>
                  <Calendar
                    onChange={(date) => setSelectedDate(date as Date)}
                    value={selectedDate}
                    tileClassName={tileClassName}
                  />
                </div>
                
                <div className="mt-6 p-4 bg-black rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {format(selectedDate, "EEEE, MMMM do, yyyy")}
                  </h3>
                  <p className="text-gray-300">
                    {dayAppointments.length} session{dayAppointments.length !== 1 ? 's' : ''} scheduled
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Day's Appointments */}
          <div>
            <Card className="bg-almost-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-lfc-red" />
                  Today's Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400">No sessions scheduled</p>
                    <p className="text-gray-500 text-sm">Select a different date to view appointments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dayAppointments
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((appointment) => (
                        <div key={appointment.id} className="border border-gray-700 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-white">
                                {appointment.clientName}
                              </h4>
                              <Badge 
                                variant={appointment.status === "scheduled" ? "default" : "secondary"}
                                className={appointment.status === "scheduled" ? "bg-lfc-red" : ""}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center text-gray-300">
                                <Clock className="w-4 h-4 mr-2" />
                                {format(new Date(appointment.date), "HH:mm")} 
                                <span className="ml-1">({appointment.duration} min)</span>
                              </div>
                              
                              <div className="flex items-center text-gray-300">
                                <User className="w-4 h-4 mr-2" />
                                {appointment.serviceType}
                              </div>
                              
                              <div className="flex items-center text-gray-300">
                                <Mail className="w-4 h-4 mr-2" />
                                {appointment.clientEmail}
                              </div>
                              
                              {appointment.clientPhone && (
                                <div className="flex items-center text-gray-300">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {appointment.clientPhone}
                                </div>
                              )}
                            </div>
                            
                            {appointment.notes && (
                              <div className="mt-3 p-3 bg-black rounded border border-gray-700">
                                <p className="text-gray-200 text-sm">{appointment.notes}</p>
                              </div>
                            )}
                            
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-almost-black border-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-lfc-red hover:bg-bright-red text-white">
                  Add New Session
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                  View All Appointments
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                  Set Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}