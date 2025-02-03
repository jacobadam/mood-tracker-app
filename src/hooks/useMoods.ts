import { useState, useEffect } from "react";

type MoodType = "PLEASANT" | "SAD" | "EXCITED";

interface Mood {
  id: number;
  type: MoodType;
  createdAt: string;
}

export function useMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const response = await fetch("http://localhost:3001/moods");
        const fetchedMoods: Mood[] = await response.json();

        const sortedMoods = fetchedMoods.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMoods(sortedMoods);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch moods");
        setLoading(false);
      }
    };

    loadMoods();
  }, []);

  return { moods, loading, error };
}
