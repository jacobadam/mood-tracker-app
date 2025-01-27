import React from "react";
import MoodAnimationContainer from "./MoodAnimationContainer";
import MoodLogContainer from "./MoodLogContainer";

const MoodTrackerApp: React.FC = () => {
  return (
    <div className="relative flex h-screen items-center justify-center p-12 box-border">
      <div className="flex flex-1 max-w-[70%] h-full">
        <MoodAnimationContainer />
      </div>

      <div className="relative flex flex-1 max-w-[30%] h-full">
        <MoodLogContainer />
      </div>
    </div>
  );
};

export default MoodTrackerApp;
