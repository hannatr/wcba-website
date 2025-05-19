"use server";

import { Separator } from "@/components/ui/separator";
import Disclaimer from "@/components/Disclaimer";

export default async function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Contact Us</h2>

        <Separator className="my-8" />
        <h3 className="text-2xl font-bold mb-2 text-red-600">
          Wayne County Bar Association
        </h3>
        <p className="mb-1">P.O. Box 284</p>
        <p className="mb-1">Lyons, NY 14489</p>
        <p className="mb-4">
          <a
            href="mailto:waynecountybarny@gmail.com"
            className="text-blue-600 hover:underline"
          >
            waynecountybarny@gmail.com
          </a>
        </p>

        <Separator className="my-8" />
        <Disclaimer />
      </section>
    </main>
  );
}
