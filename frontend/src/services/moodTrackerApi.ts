import { Mood, MoodType, NewMood } from "../types/mood-types";

const API_URL: string =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
    : "http://localhost:8080";

export async function fetchMoods(): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/moods`);

  if (!response.ok) throw new Error("Failed to fetch moods");
  return response.json();
}

export async function addMood(type: MoodType): Promise<Mood> {
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
}

export async function deleteMood(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/mood/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete mood");
  }
}
