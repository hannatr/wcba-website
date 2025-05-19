"use client";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function NewMembersPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          Membership Levels & Annual Dues
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-xl font-bold mb-2">Annual Membership</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">Attorney Member - $100.00</span>
              </li>
              <li>
                <span className="font-semibold">Affiliate Member - $30.00</span>
                <p className="text-gray-700 mt-1">
                  Includes retired attorneys and non-attorney members; law and
                  pre-law students, law school graduates not admitted in any
                  jurisdiction, persons awaiting admission to the NYS Bar,
                  support staff, paralegals, and court staff.
                </p>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p>
              The WCBA Membership year runs from September 1 through August 31.
            </p>
            <p>
              <strong>
                Members joining after June 1 will have their dues applied to the
                following membership year.
              </strong>
            </p>
            <p>
              Any person who is admitted to the practice of law in the State of
              New York and resides and/or practices law in Wayne County shall be
              eligible to be a regular member of the Association. Membership
              year runs January through December.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          Apply for Membership
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Apply Online</h4>
            <p>
              Complete your membership application and submit payment through
              our secure online system.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                  Apply Online
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-600">
                    Coming Soon
                  </DialogTitle>
                </DialogHeader>
                <p className="text-center py-4">
                  Online application processing is currently under development.
                  Please use the mail-in application option below.
                </p>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Apply by Mail</h4>
            <p>
              Download and complete the membership application form, then mail
              it with your payment.
            </p>
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                    Download Application Form
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-red-600">
                      Coming Soon
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-center py-4">
                    The application form is currently being updated. Please
                    check back soon!
                  </p>
                </DialogContent>
              </Dialog>
              <div>
                <p className="font-semibold mb-2">
                  Mail completed application and payment to:
                </p>
                <p>Wayne County Bar Association</p>
                <p>c/o Treasurer</p>
                <p>P.O. Box 284</p>
                <p>Lyons, NY 14489</p>
              </div>
              <p className="text-sm text-gray-600">
                Please include a check payable to &quot;WCBA&quot; for the
                appropriate membership dues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
