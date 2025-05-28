"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import type { Member } from "@/data-access/members";
import { memberships } from "@/actions/types/members";

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

interface MemberFormProps {
  member?: Member;
  onSubmit?: (data: any) => void;
  instructions: string;
}

export default function MemberForm({
  member,
  onSubmit,
  instructions,
}: MemberFormProps) {
  const [membershipType, setMembershipType] = useState(
    member?.membership || ""
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (member) {
      setIsFormValid(true);
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Form submitted:", data);
    }
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const requiredFields = form.querySelectorAll("[required]");
    const isAllRequiredFilled = Array.from(requiredFields).every(
      (field) => (field as HTMLInputElement).value.trim() !== ""
    );
    setIsFormValid(isAllRequiredFilled && membershipType !== "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="space-y-6"
    >
      <div className="text-sm text-gray-500 space-y-2">
        <p>{instructions}</p>
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
            {memberships.map((type) => (
              <option key={type.name} value={type.name}>
                {type.display} - ${type.price}
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
            defaultValue={member?.name || ""}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="firm">Firm Name</Label>
          <Input
            id="firm"
            name="firm"
            placeholder="Enter your firm name"
            defaultValue={member?.firm || ""}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter your street address"
            defaultValue={member?.address || ""}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            name="address2"
            placeholder="Apartment, suite, unit, etc."
            defaultValue={member?.address2 || ""}
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
              defaultValue={member?.city || ""}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              name="state"
              defaultValue={member?.state || ""}
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
              defaultValue={member?.zip?.toString() || ""}
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
              defaultValue={member?.phone || ""}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fax">Fax Number</Label>
            <Input
              id="fax"
              name="fax"
              placeholder="Enter your fax number"
              defaultValue={member?.fax || ""}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Address *</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="displayEmail"
                name="displayEmail"
                defaultChecked={member?.display_email || true}
              />
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
            defaultValue={member?.email || ""}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            placeholder="Enter your website URL"
            defaultValue={member?.website || ""}
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
        Submit
      </Button>
    </form>
  );
}
