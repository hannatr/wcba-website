"use server";

import { createClient } from "@/data-access/supabaseClient";
import { Database } from "@/data-access/database.types";

export type Member = Database["public"]["Tables"]["members"]["Row"];

export async function getMembers(): Promise<Member[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[getMembers] Error fetching members:", error.message);
    return null;
  }

  return data;
}

export async function getMember(email: string): Promise<Member | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("[getMember] Error fetching member:", error.message);
    return null;
  }

  return data[0] || null;
}
