import React from "react";
import MoodAnimationContainer from "./MoodAnimationContainer";
import MoodLogContainer from "./MoodLogContainer";
import LogMoodButton from "./LogMoodButton";

const MoodTrackerApp: React.FC = () => {
  return (
    <div className="relative flex flex-col lg:flex-row h-screen items-center justify-center p-12 box-border lg:gap-2">
      <div className="flex flex-1 h-full max-w-full">
        <MoodAnimationContainer />
      </div>

      <div className="relative flex max-w-full lg:max-w-[30%] h-full flex-col items-center xl:pr-32">
        <MoodLogContainer />
        <LogMoodButton />
      </div>
    </div>
  );
};

export default MoodTrackerApp;
