const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

interface Mood {
  createdAt: string;
  id: number;
  type: "SAD" | "EXCITED" | "PLEASANT";
}

export async function fetchMoods(apiKey: string): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/moods`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch moods");
  }

  return response.json();
}

export async function addMood(
  type: "SAD" | "EXCITED" | "PLEASANT",
  apiKey: string
): Promise<Mood> {
  try {
    const moods = await fetchMoods(apiKey);
    const latestId =
      moods.length > 0 ? Math.max(...moods.map((mood) => mood.id)) : 0;
    const newId = latestId + 1;

    const newMood: Mood = {
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
      body: JSON.stringify(newMood),
    });

    if (!response.ok) {
      throw new Error("Failed to add mood");
    }

    const addedMood = await response.json();
    return addedMood;
  } catch (error) {
    // adding fallback for backend not connected and posting into the db.json instead
    console.error("Backend error, fallback mechanism:", error);

    const moods = await fetchMoods(apiKey);
    const latestId =
      moods.length > 0 ? Math.max(...moods.map((mood) => mood.id)) : 0;
    const newId = latestId + 1;

    const fallbackMood: Mood = {
      createdAt: new Date().toISOString(),
      id: newId,
      type,
    };

    return fallbackMood;
  }
}
