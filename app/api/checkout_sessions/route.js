import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { membershipType } = await req.json();

    // Define prices based on membership type
    const prices = {
      attorney: "price_1RRESnCiF07jfeaSQM838g5P",
      affiliate: "price_1RRETOCiF07jfeaSofAllevZ",
    };

    // Get the appropriate price ID
    const priceId = prices[membershipType];
    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid membership type" },
        { status: 400 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/current-members?canceled=true`,
      metadata: {
        membershipType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
