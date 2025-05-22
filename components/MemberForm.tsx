"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const MEMBERSHIP_TYPES = [
  { id: "attorney", label: "Attorney Member", price: 100 },
  { id: "affiliate", label: "Affiliate Member", price: 30 },
];

export default function MemberForm() {
  const [membershipType, setMembershipType] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const requiredFields = form.querySelectorAll("[required]");
    const isAllRequiredFilled = Array.from(requiredFields).every(
      (field) => (field as HTMLInputElement).value.trim() !== ""
    );
    setIsFormValid(isAllRequiredFilled && membershipType !== "");
  };

  const selectedPrice = MEMBERSHIP_TYPES.find(
    (t) => t.id === membershipType
  )?.price;

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="space-y-6"
    >
      <div className="text-sm text-gray-500 space-y-2">
        <p>
          Please complete this form to apply for membership in the Wayne County
          Bar Association. Information provided will be displayed in the Member
          Directory.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="membershipType">Membership Type *</Label>
          <select
            id="membershipType"
            name="membershipType"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select membership type</option>
            {MEMBERSHIP_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label} - ${type.price}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="firm">Firm Name</Label>
          <Input
            id="firm"
            name="firm"
            placeholder="Enter your firm name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter your street address"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            name="address2"
            placeholder="Apartment, suite, unit, etc."
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Enter your city"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              name="state"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a state</option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              name="zip"
              type="number"
              placeholder="Enter your ZIP code"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fax">Fax Number</Label>
            <Input
              id="fax"
              name="fax"
              placeholder="Enter your fax number"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Address *</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="displayEmail" name="displayEmail" defaultChecked />
              <Label htmlFor="displayEmail" className="text-sm font-normal">
                Display email in directory
              </Label>
            </div>
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            placeholder="Enter your website URL"
            className="w-full"
          />
        </div>
      </div>
      <div className="text-sm text-gray-500 space-y-2">
        <p>
          Please use the email provided in this form when submitting your dues
          through the third party online payment system.
        </p>
      </div>
      <Button
        type="submit"
        className="w-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        {selectedPrice ? `Pay Dues: $${selectedPrice}` : "Submit Information"}
      </Button>
    </form>
  );
}
