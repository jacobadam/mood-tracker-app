import React, { useState } from "react";
import Lottie from "react-lottie";

interface MoodCardProps {
  lottie: any;
  mood: "PLEASANT" | "SAD" | "EXCITED";
  date: string;
  isSelected: boolean;
  onMoodSelect: (mood: "PLEASANT" | "SAD" | "EXCITED") => void;
}

const MoodCard: React.FC<MoodCardProps> = ({
  lottie,
  mood,
  date,
  isSelected,
  onMoodSelect,
}) => {
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

  const finalFormattedDateMobile = new Date(date)
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClick = () => {
    onMoodSelect(mood);
  };

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden lg:flex items-center w-full min-w-80 justify-center px-6 h-20 rounded-3xl bg-white border-2 focus:outline-none focus:ring-2 transition-transform hover:h-32 hover:bg-lavender-200 lg:block ${
          isSelected ? "border-lavender-300" : "border-transparent"
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-12">
            <Lottie options={defaultOptions} isStopped={!isHovered} />
          </div>

          <div className="flex flex-col justify-center items-start w-full h-full">
            <span className="text-lg font-medium text-gray-800">
              {formattedMood}
            </span>
            <span className="text-sm text-gray-500">{finalFormattedDate}</span>
          </div>
        </div>
      </button>

      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-30 h-30 bg-white p-4 rounded-3xl hover:bg-lavender-200 border-none text-2xl lg:hidden"
      >
        <div className="w-8 h-8">
          <Lottie options={defaultOptions} isPaused />
        </div>
        <span className="mt-2 text-sm font-bold h-4">{formattedMood}</span>
        <span className="mt-2 text-sm text-gray-500">
          {finalFormattedDateMobile}
        </span>
      </button>
    </>
  );
};

export default MoodCard;
