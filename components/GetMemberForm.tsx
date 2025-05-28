"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMember } from "@/data-access/members";
import type { Member } from "@/data-access/members";

interface GetMemberFormProps {
  onMemberFound: (member: Member) => void;
}

export default function GetMemberForm({ onMemberFound }: GetMemberFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const member = await getMember(email);
      if (member) {
        onMemberFound(member);
      } else {
        setError("No member found with this email address.");
      }
    } catch (err) {
      setError("An error occurred while looking up the member.");
      console.error("Error looking up member:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-red-600 text-white hover:bg-red-700"
        disabled={isLoading}
      >
        {isLoading ? "Looking up..." : "Find Member"}
      </Button>
    </form>
  );
}
