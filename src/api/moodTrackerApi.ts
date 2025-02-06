import { Mood, MoodType } from "../types/mood-types";

const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function fetchMoods(apiKey: string): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/moods`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) throw new Error("Failed to fetch moods");
  return response.json();
}

export async function addMood(type: MoodType, apiKey: string): Promise<Mood> {
  try {
    const moods = await fetchMoods(apiKey);
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
        Authorization: `Bearer ${apiKey}`,
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

    const moods = await fetchMoods(apiKey).catch(() => []);
    const latestId = moods.length ? Math.max(...moods.map((m) => m.id)) : 0;
    const newId = latestId + 1;

    return {
      createdAt: new Date().toISOString(),
      id: newId,
      type,
    };
  }
}
