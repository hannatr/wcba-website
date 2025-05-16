"use server";

import Link from "next/link";
import { getMembers } from "@/data-access/members";
import MemberTable from "@/components/MemberTable";

export default async function Members() {
  const members = await getMembers();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Member List</h2>
        <p className="mb-4">
          <strong>
            The Wayne County Bar Association does not engage in lawyer referral
            services.
          </strong>{" "}
          However, we maintain a directory of members, noting the types of cases
          that each attorney handles, to assist you in choosing an attorney.
          Click on a practice area for a list of attorneys who handle this type
          of case. Please note that not all of our members are attorneys:
          affiliate members may include support staff, paralegals, court clerks
          or business members. The information below is updated by our members,
          as a public service.
        </p>
        <p className="mb-4">
          <strong>
            PLEASE DO NOT CONTACT THE WAYNE COUNTY BAR ASSOCIATION SEEKING A
            REFERRAL FOR A LAWYER.
          </strong>{" "}
          You may contact the{" "}
          <Link
            href="https://www.nysba.org/referral-service"
            className="text-blue-600 hover:underline"
          >
            New York State Bar Association Lawyer Referral Service
          </Link>{" "}
          at (800) 342-3661 or{" "}
          <a
            href="mailto:LR@nysba.org"
            className="text-blue-600 hover:underline"
          >
            LR@nysba.org
          </a>
        </p>

        <h3 className="text-2xl font-bold mb-4 text-red-600">Members</h3>
        <MemberTable members={members} />
      </section>
    </main>
  );
}
