import { useState } from "react";
import { addMood } from "../api/moodTrackerApi";
import { MoodType } from "../types/mood-types";

export const useAddMood = (apiKey: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMood = async (mood: MoodType) => {
    if (!apiKey) {
      setError("API key is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addMood(mood, apiKey);
      console.log(`Mood "${mood}" successfully posted.`);
    } catch (error) {
      setError(`Failed to post mood: ${(error as Error).message}`);
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
