import React, { useState } from "react";
import Lottie from "react-lottie";
import { motion } from "framer-motion";

interface MoodCardProps {
  lottie: any;
  mood: "PLEASANT" | "SAD" | "EXCITED";
  date: string;
}

const MoodCard: React.FC<MoodCardProps> = ({ lottie, mood, date }) => {
  const [isSelected, setIsSelected] = useState(false);

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

  // add functionality later
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        backgroundColor: "var(--Lavender-200---Opacity, #C2C0FA80)",
      }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-center p-6 h-20 rounded-3xl bg-white border-2 
      focus:outline-none focus:ring-2 transition-transform 
      ${isSelected ? "border-lavender-300" : "border-transparent"}`}
    >
      <div className="flex items-center justify-center gap-4">
        <div className="w-16 h-12">
          <Lottie
            options={defaultOptions}
            isStopped
            isPaused
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
    </motion.button>
  );
};

export default MoodCard;
