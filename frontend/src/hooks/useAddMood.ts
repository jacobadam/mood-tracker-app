import { useState } from "react";
import { addMood } from "../services/moodTrackerApi";
import { Mood, MoodType } from "../types/mood-types";

export const useAddMood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMood = async (mood: MoodType): Promise<Mood | null> => {
    setLoading(true);
    setError(null);

    try {
      const newMood = await addMood(mood);
      return newMood;
    } catch (error) {
      setError(`Failed to post mood: ${(error as Error).message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    postMood,
  };
};
