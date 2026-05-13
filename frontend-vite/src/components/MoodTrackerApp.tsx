import { useState } from "react";
import { useSearchParams } from "react-router";
import { MoodAnimationContainer } from "./MoodAnimationContainer";
import { MoodLogContainer } from "./MoodLogContainer";
import { LogMoodButton } from "./LogMoodButton";
import { type MoodTypeUnion, MoodType } from "../types/mood-types";

export const MoodTrackerApp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const moodParam = searchParams.get("mood");

  const initialMood: MoodTypeUnion = Object.values(MoodType).includes(
    moodParam as MoodTypeUnion,
  )
    ? (moodParam as MoodTypeUnion)
    : MoodType.PLEASANT;

  const [selectedMood, setSelectedMood] = useState<MoodTypeUnion>(initialMood);

  const handleMoodSelect = (mood: MoodTypeUnion) => {
    setSelectedMood(mood);
    setSearchParams({ mood });
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen items-center justify-center p-12 box-border lg:gap-8">
      <div className="flex items-center justify-center w-[320px] h-[320px] sm:w-[500px] sm:h-[600px] md:w-[520px] md:h-[470px] lg:w-[620px] lg:h-[580px] 2xl:w-[912px] 2xl:h-[850px]">
        <MoodAnimationContainer mood={selectedMood} />
      </div>

      <div className="relative flex max-w-full lg:max-w-[35%] h-full flex-col p-2">
        <MoodLogContainer onMoodSelect={handleMoodSelect} />
        <LogMoodButton onMoodSelect={handleMoodSelect} />
      </div>
    </div>
  );
};
