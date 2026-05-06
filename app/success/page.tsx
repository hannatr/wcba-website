"use server";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Success() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-red-600">
            Thank You!
          </h1>

          <Separator className="my-6" />

          <div className="space-y-4">
            <p className="text-lg">
              Your request has been received successfully.
            </p>

            <p className="text-gray-600">
              We will process your request and get back to you as soon as possible.
            </p>
          </div>

          <div className="pt-6 space-y-4">
            <p className="text-sm text-gray-500">
              If you have any questions, please contact:
            </p>
            <a
              href="mailto:waynecountybarny@gmail.com"
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              waynecountybarny@gmail.com
            </a>
          </div>

          <div className="pt-8">
            <Link href="/">
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
