"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  date: string;
  time: string;
  name: string;
  location: string;
  description: string;
  type: "meeting" | "cle" | "social";
  registrationRequired: boolean;
}

const events: Event[] = [
  {
    id: "1",
    date: "June 12, 2024",
    time: "12:00 PM",
    name: "Monthly Bar Association Meeting",
    location: "Wayne County Courthouse - Jury Room",
    description:
      "Join us for our monthly meeting to discuss current legal matters and association business. Lunch will be provided.",
    type: "meeting",
    registrationRequired: false,
  },
  {
    id: "2",
    date: "June 21, 2024",
    time: "1:00 PM",
    name: "Annual Golf Tournament",
    location: "Wayne Hills Country Club",
    description:
      "Join fellow members for our annual golf tournament. Includes lunch, golf, dinner, and prizes. Teams of four welcome.",
    type: "social",
    registrationRequired: true,
  },
  {
    id: "3",
    date: "July 10, 2024",
    time: "9:00 AM - 12:00 PM",
    name: "CLE: Recent Changes in Family Law",
    location: "Wayne County Courthouse - Courtroom 1",
    description:
      "3.0 CLE credits. Learn about recent legislative changes affecting family law practice in New York State.",
    type: "cle",
    registrationRequired: true,
  },
  {
    id: "4",
    date: "July 17, 2024",
    time: "12:00 PM",
    name: "Monthly Bar Association Meeting",
    location: "Wayne County Courthouse - Jury Room",
    description:
      "Join us for our monthly meeting to discuss current legal matters and association business. Lunch will be provided.",
    type: "meeting",
    registrationRequired: false,
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-2 text-red-600">
          Upcoming Events
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          This page contains dummy data for demonstration purposes.
        </p>

        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-red-600 mb-2">
                      {event.name}
                    </CardTitle>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-red-600">
                            Coming Soon
                          </DialogTitle>
                        </DialogHeader>
                        <p className="text-center py-4">
                          Event details are currently under development. Please
                          check back soon!
                        </p>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                          {event.registrationRequired ? "Register" : "RSVP"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-red-600">
                            Coming Soon
                          </DialogTitle>
                        </DialogHeader>
                        <p className="text-center py-4">
                          Online registration is currently under development.
                          Please check back soon!
                        </p>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
