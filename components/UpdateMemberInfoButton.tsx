"use client";

import { useState, useEffect, useCallback } from "react";

import { submitMemberUpdateRequest } from "@/actions/members";
import GetMemberForm from "@/components/GetMemberForm";
import MemberForm from "@/components/MemberForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Member } from "@/data-access/members";

export default function UpdateMemberInfoButton() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow dialog close animation
      const timer = setTimeout(() => {
        setSelectedMember(null);
        setSubmitError(null);
        setSubmitSuccess(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMemberFound = useCallback((member: Member) => {
    setSelectedMember(member);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  const handleSubmit = useCallback(async (formData: FormData) => {
    if (!selectedMember) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await submitMemberUpdateRequest(selectedMember.id, formData);
      if (result.success) {
        setSubmitSuccess(true);
        // Close dialog after 5 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      } else {
        setSubmitError(result.error || "Failed to update member information.");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedMember]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset states when closing
      setSelectedMember(null);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
          Update Member Information
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">
            {selectedMember ? "Update Member Information" : "Find Member"}
          </DialogTitle>
          <DialogDescription>
            {selectedMember
              ? "Review your member details and submit requested updates."
              : "Search for your member record before requesting updates."}
          </DialogDescription>
        </DialogHeader>
        {submitSuccess ? (
          <div className="py-4">
            <p className="text-green-600 font-semibold">
              Update member information submitted. Please allow 1-2 days for the changes to be reflected in the Member Directory.
            </p>
          </div>
        ) : selectedMember ? (
          <>
            {submitError && (
              <p className="text-sm text-red-600 mb-4">{submitError}</p>
            )}
            <MemberForm
              member={selectedMember}
              instructions="Please review and update your member information. Changes will be reflected in the Member Directory."
              onSubmit={handleSubmit}
            />
            {isSubmitting && (
              <p className="text-sm text-gray-600 mt-2">
                Updating member information...
              </p>
            )}
          </>
        ) : (
          <GetMemberForm onMemberFound={handleMemberFound} />
        )}
      </DialogContent>
    </Dialog>
  );
}
