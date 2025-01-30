import React, { useState } from "react";
import Lottie from "react-lottie";

interface MoodCardProps {
  lottie: any;
  mood: "PLEASANT" | "SAD" | "EXCITED";
  date: string;
}

const MoodCard: React.FC<MoodCardProps> = ({ lottie, mood, date }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedMood =
    mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const formattedTime = newDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const finalFormattedDate = `${formattedDate} at ${formattedTime}`;

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center w-full h-20 p-6 rounded-3xl bg-white border-none"
    >
      <div className="flex items-center justify-center gap-4">
        <div className="w-16 h-12">
          <Lottie
            options={defaultOptions}
            isStopped={!isHovered}
            isPaused={false}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center items-start w-full h-full">
          <span className="text-lg font-medium text-gray-800">
            {formattedMood}
          </span>
          <span className="text-sm text-gray-500">{finalFormattedDate}</span>
        </div>
      </div>
    </button>
  );
};

export default MoodCard;
