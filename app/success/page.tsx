"use server";

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, customer_details, metadata } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
  const customerEmail = customer_details?.email;
  const membershipType =
    metadata?.membershipType === "attorney" ? "Attorney" : "Affiliate";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <section className="container mx-auto py-12 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-red-600">
              Payment Successful!
            </h1>

            <Separator className="my-6" />

            <div className="space-y-4">
              <p className="text-lg">
                Thank you for renewing your {membershipType} membership with the
                Wayne County Bar Association.
              </p>

              <p className="text-gray-600">
                A confirmation email has been sent to{" "}
                <span className="font-semibold">{customerEmail}</span>
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm text-gray-500">
                If you have any questions about your membership, please contact:
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
}
