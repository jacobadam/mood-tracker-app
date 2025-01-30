import React, { useState, useEffect } from "react";
import MoodCard from "./MoodCard";
import { fetchMoods } from "../moodTrackerApi";
import pleasantLottie from "../assets/lottie/pleasant.json";
import sadLottie from "../assets/lottie/sad.json";
import excitedLottie from "../assets/lottie/excited.json";

type MoodType = "PLEASANT" | "SAD" | "EXCITED";

interface Mood {
  id: number;
  type: MoodType;
  createdAt: string;
}

const moodMap: Record<MoodType, any> = {
  PLEASANT: pleasantLottie,
  SAD: sadLottie,
  EXCITED: excitedLottie,
};

const MoodLogContainer: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
          console.error("API key is missing.");
          return;
        }

        const fetchedMoods: Mood[] = await fetchMoods(apiKey);

        setMoods(fetchedMoods);
      } catch (error) {
        console.error("Failed to fetch moods:", (error as Error).message);
      }
    };

    loadMoods();
  }, []);

  return (
    <div className="fade-mask flex flex-col gap-2 p-4 overflow-y-auto w-full no-scrollbar items-center">
      {moods.map((mood) => (
        <MoodCard
          key={mood.id}
          lottie={moodMap[mood.type]}
          mood={mood.type}
          date={mood.createdAt}
        />
      ))}
    </div>
  );
};

export default MoodLogContainer;
