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
import { isCustomCategory, isMemberCategory } from "@/actions/types/members";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, AlertCircle } from "lucide-react";

interface MemberTableProps {
  members: Member[] | null;
}

export default function MemberTable({ members }: MemberTableProps) {
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const formatCategories = (categories: any): string[] => {
    if (!categories) return [];

    const parsedCategories = Array.isArray(categories) ? categories : [];

    return parsedCategories
      .map((category) => {
        if (isMemberCategory(category)) {
          return category;
        } else if (isCustomCategory(category)) {
          return `Other: ${category.customText}`;
        }
        return null;
      })
      .filter((category): category is string => category !== null)
      .sort();
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    members?.forEach((member) => {
      formatCategories(member.categories).forEach((category) => {
        categories.add(category);
      });
    });
    return Array.from(categories).sort();
  };

  const filteredMembers = members?.filter((member) => {
    if (selectedCategories.size === 0) return true;
    const memberCategories = formatCategories(member.categories);
    return memberCategories.some((category) =>
      selectedCategories.has(category)
    );
  });

  const sortedMembers = filteredMembers?.sort((a, b) => {
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
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex items-start space-x-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg flex-1">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">CATEGORIES</p>
            <p>
              Note that members may list up to 4 practice categories but often
              handle other types of cases. See the "Other" category or call
              individual members for further inquiries.
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {selectedCategories.size > 0
                ? `${selectedCategories.size} categories selected`
                : "Filter by categories"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="end">
            <ScrollArea className="h-[300px] p-4">
              <div className="space-y-2">
                {getAllCategories().map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.has(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>

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
                {sortField === "address" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
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
                {sortField === "website" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Categories</TableHead>
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
                <TableCell>
                  {formatCategories(member.categories).map(
                    (category, index) => (
                      <div key={index}>{category}</div>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
