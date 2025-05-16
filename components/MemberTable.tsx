"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from "@/data-access/members";

interface MemberTableProps {
  members: Member[] | null;
}

export default function MemberTable({ members }: MemberTableProps) {
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedMembers = members?.sort((a, b) => {
    const aValue = a[sortField as keyof typeof a] ?? "";
    const bValue = b[sortField as keyof typeof b] ?? "";
    return sortDirection === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  return (
    <Card className="rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Name{" "}
              {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("address")}
              className="cursor-pointer"
            >
              Address{" "}
              {sortField === "address" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Phone/Fax</TableHead>
            <TableHead
              onClick={() => handleSort("email")}
              className="cursor-pointer"
            >
              Email{" "}
              {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("website")}
              className="cursor-pointer"
            >
              Website{" "}
              {sortField === "website" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>
                {member.firm && (
                  <>
                    {member.firm}
                    <br />
                  </>
                )}
                {member.address}
                {member.address2 && <br />}
                {member.address2}
                {member.city && <br />}
                {member.city}
                {member.state && `, ${member.state}`} {member.zip}
              </TableCell>
              <TableCell>
                {member.phone}
                {member.fax && <br />}
                {member.fax && `Fax: ${member.fax}`}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
