import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoodAnimationContainer from "./MoodAnimationContainer";
import MoodLogContainer from "./MoodLogContainer";
import LogMoodButton from "./LogMoodButton";
import { MoodType } from "../types/mood-types";

const MoodTrackerApp: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const moodParam = searchParams.get("mood");

  const initialMood: MoodType = Object.values(MoodType).includes(
    moodParam as MoodType
  )
    ? (moodParam as MoodType)
    : MoodType.PLEASANT;

  const [selectedMood, setSelectedMood] = useState<MoodType>(initialMood);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setSearchParams({ mood });
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen items-center justify-center p-12 box-border lg:gap-8">
      <div className="flex items-center justify-center w-[320px] h-[320px] sm:w-[500px] sm:h-[600px] md:w-[570px] md:h-[470px] lg:w-[700px] lg:h-[580px] 2xl:w-[912px] 2xl:h-[850px]">
        <MoodAnimationContainer mood={selectedMood} />
      </div>

      <div className="relative flex max-w-full lg:max-w-[35%] h-full flex-col p-2">
        <MoodLogContainer
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />
        <LogMoodButton onMoodSelect={handleMoodSelect} />
      </div>
    </div>
  );
};

export default MoodTrackerApp;
