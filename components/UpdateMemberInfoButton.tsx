"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GetMemberForm from "@/components/GetMemberForm";
import MemberForm from "@/components/MemberForm";
import type { Member } from "@/data-access/members";

export default function UpdateMemberInfoButton() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMemberFound = (member: Member) => {
    setSelectedMember(member);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Update Member Information
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">
            {selectedMember ? "Update Member Information" : "Find Member"}
          </DialogTitle>
        </DialogHeader>
        {selectedMember ? (
          <MemberForm
            member={selectedMember}
            instructions="Please review and update your member information. Changes will be reflected in the Member Directory."
          />
        ) : (
          <GetMemberForm onMemberFound={handleMemberFound} />
        )}
      </DialogContent>
    </Dialog>
  );
}
