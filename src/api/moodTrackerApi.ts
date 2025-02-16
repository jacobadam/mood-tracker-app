import { Mood, MoodType, NewMood } from "../types/mood-types";

const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export async function fetchMoods(): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/moods`);

  if (!response.ok) throw new Error("Failed to fetch moods");
  return response.json();
}

export async function addMood(type: MoodType): Promise<Mood | null> {
  try {
    const mood: NewMood = {
      type,
    };

    const response = await fetch(`${API_URL}/mood`, {
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
    console.error("Error adding mood:", error);
    return null;
  }
}
