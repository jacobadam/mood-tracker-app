import { Mood, MoodType } from "../types/mood-types";

const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export async function fetchMoods(): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/moods`);

  if (!response.ok) throw new Error("Failed to fetch moods");
  return response.json();
}

export async function addMood(type: MoodType): Promise<Mood> {
  try {
    const moods = await fetchMoods();
    const latestId = moods.length ? Math.max(...moods.map((m) => m.id)) : 0;
    const newId = latestId + 1;

    const mood: Mood = {
      createdAt: new Date().toISOString(),
      id: newId,
      type,
    };

    const response = await fetch(`${API_URL}/moods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mood),
    });

    if (!response.ok) {
      throw new Error("Failed to add mood");
    }

    return response.json();
  } catch (error) {
    // adding fallback for backend not connected and posting into the db.json instead
    console.error("Backend not connecting", error);

    const moods = await fetchMoods().catch(() => []);
    const latestId = moods.length ? Math.max(...moods.map((m) => m.id)) : 0;
    const newId = latestId + 1;

    return {
      createdAt: new Date().toISOString(),
      id: newId,
      type,
    };
  }
}
