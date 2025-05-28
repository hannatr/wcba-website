"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DownloadAppButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
          Download Application Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Coming Soon</DialogTitle>
        </DialogHeader>
        <p className="text-center py-4">
          The application form is currently being updated. Please check back
          soon!
        </p>
      </DialogContent>
    </Dialog>
  );
}
