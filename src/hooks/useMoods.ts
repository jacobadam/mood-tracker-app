import { useState, useEffect } from "react";
import { Mood } from "../types/mood-types";
import { fetchMoods } from "../api/moodTrackerApi";
import { connectWebSocket, disconnectWebSocket } from "../utils/websocket";

export function useMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const fetchedMoods: Mood[] = await fetchMoods();

        const sortedMoods = fetchedMoods.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMoods(sortedMoods);
      } catch (error) {
        setError("Failed to fetch moods");
      } finally {
        setLoading(false);
      }
    };

    loadMoods();

    const handleNewMood = (newMood: Mood) => {
      setMoods((prevMoods) => {
        const updatedMoods = [newMood, ...prevMoods].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return [...updatedMoods];
      });
    };

    const handleDeleteMood = async (deletedMoodId: number) => {
      setMoods((prevMoods) =>
        prevMoods.filter((mood) => mood.id !== deletedMoodId)
      );
    };

    connectWebSocket(handleNewMood, handleDeleteMood);

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return { moods, loading, error };
}
