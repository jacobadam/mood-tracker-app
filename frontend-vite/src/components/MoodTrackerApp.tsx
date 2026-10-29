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
    <div className="relative flex flex-col lg:flex-row min-h-dvh lg:h-screen items-center justify-start lg:justify-center p-3 lg:p-12 box-border lg:gap-8">
      <div className="flex items-center justify-center w-full max-w-155 aspect-square max-sm:max-w-[320px] mx-auto lg:mx-0 lg:max-h-155">
        <MoodAnimationContainer mood={selectedMood} />
      </div>

      <div className="relative flex flex-col max-w-full lg:max-w-[35%] max-h-155">
        <MoodLogContainer onMoodSelect={handleMoodSelect} />
        <LogMoodButton onMoodSelect={handleMoodSelect} />
      </div>
    </div>
  );
};
