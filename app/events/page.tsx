"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

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
    date: "First Tuesday of the Month",
    time: "12:00 PM",
    name: "Monthly Bar Association Meeting",
    location: "Lyons Elk Lodge",
    description:
      "Monthly meeting to discuss current legal matters and bar association business.",
    type: "meeting",
    registrationRequired: false,
  },
];

export default async function EventsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-2 text-red-600">
          Upcoming Events
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join us for upcoming events and activities.
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
