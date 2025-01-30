import React from "react";
import MoodCard from "./MoodCard";
import { moodsData } from "../moodData";

const MoodLogContainer: React.FC = () => {
  return (
    <div className="fade-mask flex flex-col gap-2 p-4 overflow-y-auto w-full no-scrollbar items-center">
      {moodsData.map((mood) => (
        <MoodCard
          key={mood.id}
          lottie={mood.lottie}
          mood={mood.type}
          date={mood.createdAt}
        />
      ))}
    </div>
  );
};

export default MoodLogContainer;
