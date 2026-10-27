import { supabase } from "../lib/supabase";
import type { MoodEntry, MoodTypeUnion } from "../types/mood-types";

export async function fetchMoods(): Promise<MoodEntry[]> {
  const { data, error } = await supabase.from("moods").select("*");

  if (error) throw new Error(`Failed to fetch moods: ${error.message}`);

  return data;
}

export async function addMood(type: MoodTypeUnion): Promise<MoodEntry> {
  const { data, error } = await supabase
    .from("moods")
    .insert({
      type,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to add mood: ${error.message}`);

  return data;
}

export async function deleteMood(id: number): Promise<void> {
  const { error } = await supabase.from("moods").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete mood: ${error.message}`);
}
