"use server";

import { getMembers } from "@/data-access/members";
import MemberTable from "@/components/MemberTable";
import Disclaimer from "@/components/Disclaimer";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Member List</h2>
        <Disclaimer showMemberDirectory={false} />

        <h3 className="text-2xl font-bold mb-4 text-red-600">Members</h3>
        <MemberTable members={members} />
      </section>
    </main>
  );
}
