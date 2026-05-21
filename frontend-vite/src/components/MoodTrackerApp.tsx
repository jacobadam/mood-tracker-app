import { useState } from "react";
import { useSearchParams } from "react-router";
import { MoodAnimationContainer } from "./MoodAnimationContainer";
import { MoodLogContainer } from "./MoodLogContainer";
import { LogMoodButton } from "./LogMoodButton";
import { type MoodTypeUnion, Mood } from "../types/mood-types";

export const MoodTrackerApp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const moodParam = searchParams.get("mood");

  const initialMood: MoodTypeUnion = Object.values(Mood).includes(
    moodParam as MoodTypeUnion,
  )
    ? (moodParam as MoodTypeUnion)
    : Mood.PLEASANT;

  const [selectedMood, setSelectedMood] = useState<MoodTypeUnion>(initialMood);

  const handleMoodSelect = (mood: MoodTypeUnion) => {
    setSelectedMood(mood);
    setSearchParams({ mood });
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen lg:h-screen items-stretch justify-center p-3 lg:p-12 box-border lg:gap-8">
      <div className="flex items-center justify-center w-full max-w-155 aspect-square mx-auto lg:mx-0 lg:h-full">
        <MoodAnimationContainer mood={selectedMood} />
      </div>

      <div className="relative flex max-w-full lg:max-w-[35%] h-full flex-col">
        <MoodLogContainer onMoodSelect={handleMoodSelect} />
        <LogMoodButton onMoodSelect={handleMoodSelect} />
      </div>
    </div>
  );
};
