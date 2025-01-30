const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

interface Mood {
  id: number;
  type: "SAD" | "EXCITED" | "PLEASANT";
  createdAt: string;
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
  console.log(type, apiKey);

  const response = await fetch(`${API_URL}/moods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ type }),
  });

  if (!response.ok) {
    throw new Error("Failed to add mood");
  }

  return response.json();
}
