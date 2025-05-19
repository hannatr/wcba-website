"use server";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCommittee } from "@/data-access/committee";
import { Calendar, BookOpen } from "lucide-react";

export default async function HomePage() {
  const committee = await getCommittee();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-gray-900 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/Wayne_County_Courthouse.jpg"
            alt="Wayne County Courthouse"
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "brightness(0.65)" }}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Wayne County Bar Association
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow">
            Serving the Wayne County New York Legal Community Since 1921
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/current-members">
              <Button className="bg-black p-8 text-xl text-white hover:bg-gray-700 cursor-pointer">
                Current Members
              </Button>
            </Link>
            <Link href="/new-members">
              <Button className="bg-red-600 p-8 text-xl text-white hover:bg-red-700 cursor-pointer">
                Join Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Events Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Events
              </CardTitle>
              <CardDescription>Upcoming WCBA Events</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Stay updated with our latest meeting, networking and CLE events.
              </p>
              <Link href="/events">
                <Button className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                  View Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Resources
              </CardTitle>
              <CardDescription>Member resources and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Access legal forms, guidelines, and professional development
                materials.
              </p>
              <Link href="/public-resources">
                <Button className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                  Browse Resources
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        {/* About Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-red-600">
            Wayne County Bar Association Mission
          </h2>
          <p className="text-lg text-gray-700">
            The Wayne County Bar Association was founded to improve the quality
            and accessibility of justice. We strive to realize this objective by
            engaging with our members, and other agencies and organizations in
            order to inspire respect for and promote understanding of the law;
            and serve as the voice of the profession. For our members, we seek
            to enhance professional growth, excellence, collegiality and
            diversity.
          </p>
        </div>

        <Separator className="my-16" />

        {/* Executive Committee Section */}
        <h2 className="text-3xl text-center font-bold mb-4 text-red-600">
          Executive Committee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {committee?.map((member) => (
            <Card key={member.id}>
              <CardHeader className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* Future picture goes here */}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-lg font-bold mb-1">{member.name}</div>
                <div className="italic text-gray-600">{member.position}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
