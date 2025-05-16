"use server";

import { createClient } from "@/data-access/supabaseClient";
import { Database } from "@/data-access/database.types";

export type Committee = Database["public"]["Tables"]["committee"]["Row"];

export async function getCommittee(): Promise<Committee[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("committee")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getCommittee] Error fetching committee:", error.message);
    return null;
  }

  return data;
}
