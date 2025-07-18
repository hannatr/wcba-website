"use server";

import { Separator } from "@/components/ui/separator";
import RenewMemberButton from "@/components/RenewMemberButton";
import UpdateMemberInfoButton from "@/components/UpdateMemberInfoButton";

export default async function CurrentMembersPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          Current Members
        </h2>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-2">
            Update Member Contact Info
          </h3>
          <p className="mb-4">
            Update your contact information using our online form to help keep
            our Member List current and accurate.
          </p>
          <UpdateMemberInfoButton />
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Member Renewal</h3>
            <p className="mb-4">
              Membership runs from September 1 through August 31 and renews
              annually. Keep your membership active by renewing as soon as
              possible.
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <span className="font-semibold">Attorney Member - $100.00</span>
              </li>
              <li>
                <span className="font-semibold">Affiliate Member - $30.00</span>
                <p className="text-gray-700 mt-1">
                  Includes retired attorneys and non-attorney members; support
                  staff, paralegals, court clerks and related businesses.
                </p>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-red-600">
              Renewals after January 1 will be assessed a late fee of $15.
            </p>
            <p className="font-semibold text-red-600">
              Members who haven&apos;t renewed by February 1 are considered
              lapsed and will be removed from the Membership List.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-2">Lapsed Members</h3>
          <p>
            Members who have lapsed in the current year will be reinstated upon
            payment of current dues plus an administrative late fee of $30.
            Lapsed members may be reinstated in the following year with payment
            of dues. Former members who have lapsed beyond one year are
            requested to complete a new application with payment of member dues
            to ensure current contact information.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Pay Online</h4>
            <p>
              Renew your membership quickly and securely through our online
              payment system.
            </p>
            <RenewMemberButton />
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Pay by Check</h4>
            <p>
              Checks are payable to &quot;WCBA&quot;. Please indicate the member
              name(s) renewing.
            </p>
            <div>
              <p className="font-semibold mb-2">Mail check to:</p>
              <p>Wayne County Bar Association</p>
              <p>c/o Treasurer</p>
              <p>P.O. Box 284</p>
              <p>Lyons, NY 14489</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
