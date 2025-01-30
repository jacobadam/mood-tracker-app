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
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center w-full py-4 rounded-3xl bg-white">
      <div className="flex items-center justify-center gap-4">
        <div className="w-16 h-12">
          <Lottie options={defaultOptions} className="w-full h-full" />
        </div>

        <div className="flex flex-col justify-center items-start w-full h-full">
          <span className="text-lg font-medium text-gray-800">
            {formattedMood}
          </span>
          <span className="text-sm text-gray-500">{finalFormattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;
