import { supabase } from "../lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { MoodEntry } from "../types/mood-types";

let channel: RealtimeChannel | null = null;

export const connectWebSocket = (
  onNewMood?: (mood: MoodEntry) => void,
  onDeleteMood?: (id: number) => void,
): void => {
  if (channel) return;

  channel = supabase
    .channel("moods-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "moods",
      },
      (payload) => {
        onNewMood?.(payload.new as MoodEntry);
      },
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "moods",
      },
      (payload) => {
        onDeleteMood?.(payload.old.id as number);
      },
    )
    .subscribe();
};

export const disconnectWebSocket = (): void => {
  if (channel) {
    void supabase.removeChannel(channel);
    channel = null;
  }
};
