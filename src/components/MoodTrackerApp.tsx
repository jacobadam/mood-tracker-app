import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MoodAnimationContainer from "./MoodAnimationContainer";
import MoodLogContainer from "./MoodLogContainer";
import LogMoodButton from "./LogMoodButton";

const MoodTrackerApp: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const moodParam = searchParams.get("mood") as
    | "PLEASANT"
    | "SAD"
    | "EXCITED"
    | null;
  const [selectedMood, setSelectedMood] = React.useState<
    "PLEASANT" | "SAD" | "EXCITED"
  >(moodParam || "PLEASANT");

  useEffect(() => {
    if (moodParam && ["PLEASANT", "SAD", "EXCITED"].includes(moodParam)) {
      setSelectedMood(moodParam);
    }
  }, [moodParam]);

  const handleMoodSelect = (mood: "PLEASANT" | "SAD" | "EXCITED") => {
    setSelectedMood(mood);
    setSearchParams({ mood });
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen items-center justify-center p-12 box-border lg:gap-8">
      <div className="flex items-center justify-center w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[609px] md:h-[570px] 2xl:w-[912px] 2xl:h-[850px]">
        <MoodAnimationContainer newMood={selectedMood} />
      </div>

      <div className="relative flex max-w-full lg:max-w-[30%] h-full flex-col items-center">
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
