import { useState, useEffect } from "react";
import type { MoodEntry } from "../types/mood-types";
import { fetchMoods } from "../services/moodTrackerApi";
import { connectWebSocket, disconnectWebSocket } from "../services/websocket";

const sortMoods = (moods: MoodEntry[]): MoodEntry[] =>
  [...moods].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

export function useMoods() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadMoods = async () => {
      try {
        const fetchedMoods = await fetchMoods();

        if (active) {
          setMoods((previous) => {
            // Preserve any realtime events received during loading.
            const merged = new Map(fetchedMoods.map((mood) => [mood.id, mood]));

            previous.forEach((mood) => {
              merged.set(mood.id, mood);
            });

            return sortMoods([...merged.values()]);
          });
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    const handleNewMood = (newMood: MoodEntry) => {
      if (!active) return;

      setMoods((previous) =>
        sortMoods([
          newMood,
          ...previous.filter((mood) => mood.id !== newMood.id),
        ]),
      );
    };

    const handleDeleteMood = (deletedMoodId: number) => {
      if (!active) return;

      setMoods((previous) =>
        previous.filter((mood) => mood.id !== deletedMoodId),
      );
    };

    connectWebSocket(handleNewMood, handleDeleteMood);
    void loadMoods();

    return () => {
      active = false;
      disconnectWebSocket();
    };
  }, []);

  return { moods, loading, error };
}
