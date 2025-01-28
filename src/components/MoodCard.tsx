import React from "react";
import Lottie from "react-lottie";

interface MoodCardProps {
  lottie: any;
  mood: "PLEASANT" | "SAD" | "EXCITED";
  date: string;
}

const MoodCard: React.FC<MoodCardProps> = ({ lottie, mood, date }) => {
  const formattedMood =
    mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();

  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex w-80 p-4 rounded-3xl bg-white">
      <div className="w-12 h-12">
        <Lottie options={defaultOptions} className="w-full h-full" />
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full text-center">
        <span className="text-lg font-medium text-gray-800">
          {formattedMood}
        </span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
};

export default MoodCard;
