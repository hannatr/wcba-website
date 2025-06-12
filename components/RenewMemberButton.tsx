"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function RenewMemberButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);

  /* Original renewal logic - preserved for future implementation
  const handleRenewal = async (membershipType: "attorney" | "affiliate") => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ membershipType }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session. Please try again.");
    } finally {
      setIsLoading(false);
      setShowMembershipDialog(false);
    }
  };
  */

  return (
    <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Renew Membership Online"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Feature Coming Soon
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* <Button
            onClick={() => handleRenewal("attorney")}
            className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            disabled={isLoading}
          >
            Attorney Member - $100.00
          </Button>
          <Button
            onClick={() => handleRenewal("affiliate")}
            className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            disabled={isLoading}
          >
            Affiliate Member - $30.00
          </Button> */}
          <p className="text-center text-gray-600">
            Online membership renewal will be available soon. Please check back
            later.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
