import { useState } from "react";
import { deleteMood } from "../services/moodTrackerApi";

export const useDeleteMood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeMood = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteMood(id);
    } catch (error) {
      setError(`Failed to delete mood: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    removeMood,
  };
};
