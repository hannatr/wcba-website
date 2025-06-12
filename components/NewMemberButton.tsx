"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MemberForm from "@/components/MemberForm";

export default function NewMemberButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
          Apply Online
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            {/* New Member Application */}Feature Coming Soon
          </DialogTitle>
        </DialogHeader>
        {/* <MemberForm
          instructions="Please complete this form to apply for membership in the Wayne County
          Bar Association. Information provided will be displayed in the
          Member Directory. You are required to pay dues in full at the time of application."
        /> */}
        <p className="text-center text-gray-600">
          Online membership application will be available soon. Please check
          back later.
        </p>
      </DialogContent>
    </Dialog>
  );
}
