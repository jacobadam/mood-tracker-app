const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

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
