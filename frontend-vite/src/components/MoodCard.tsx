import { useState } from "react";
import type { MoodTypeUnion } from "../types/mood-types";
import type { LottieData } from "../types/lottie-types";
import { useDeleteMood } from "../hooks/useDeleteMood";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

interface MoodCardProps {
  lottie: LottieData;
  mood: MoodTypeUnion;
  date: string;
  isSelected: boolean;
  moodId: number;
  onMoodSelect: (mood: MoodTypeUnion) => void;
}

export const MoodCard = ({
  lottie,
  mood,
  date,
  isSelected,
  moodId,
  onMoodSelect,
}: MoodCardProps) => {
  const { removeMood } = useDeleteMood();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const dotLottieRefCallback = (dotLottie: DotLottie | null) => {
    if (!dotLottie) return;
    setDotLottie(dotLottie);
  };

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
    hour12: false,
  });

  const finalFormattedDate = `${formattedDate} at ${formattedTime}`;

  const finalFormattedDateMobile = new Date(date)
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  const autoPlayFunc = () => {
    dotLottie?.play();
  };

  return (
    <>
      <div
        className="hidden lg:flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-full items-center">
          <button
            onClick={() => onMoodSelect(mood)}
            className={`w-full min-w-80 justify-center px-6 h-20 rounded-3xl bg-white border-2 focus:outline-none transition-transform hover:h-32 hover:bg-lavender-200 ${
              isSelected ? "border-lavender-300" : "border-transparent"
            }`}
          >
            <div className="flex flex-2 items-center justify-center gap-4">
              <div className="pl-4 w-16 h-16">
                <DotLottieReact
                  data={lottie}
                  renderConfig={{ autoResize: true }}
                  onMouseEnter={autoPlayFunc}
                  dotLottieRefCallback={dotLottieRefCallback}
                />
              </div>

              <div className="flex flex-col justify-center items-start w-full h-full">
                <span className="text-base font-semibold text-gray-700">
                  {formattedMood}
                </span>
                <span className="text-sm text-gray-500">
                  {finalFormattedDate}
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`transition-opacity appearance-none border-none bg-transparent ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Delete"
            onClick={() => removeMood(moodId)}
          >
            <img src={"/close.svg"} alt="Close" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="lg:hidden flex flex-col justify-center">
        <button
          onClick={() => onMoodSelect(mood)}
          className={`flex flex-col items-center justify-center bg-white p-4 rounded-3xl hover:bg-lavender-200 border-none text-2xl  ${
            isSelected ? "border-lavender-300" : "border-transparent"
          }`}
        >
          <div className="w-8 h-8">
            <DotLottieReact data={lottie} renderConfig={{ autoResize: true }} />
          </div>
          <span className="mt-2 text-xs font-bold h-4 text-black">
            {formattedMood}
          </span>
          <span className="mt-2 text-xs text-gray-500">
            {finalFormattedDateMobile}
          </span>
        </button>

        <button
          className={`flex justify-center items-center appearance-none border-none  ${
            isSelected ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Delete"
          onClick={() => removeMood(moodId)}
        >
          <img src={"/close.svg"} alt="Close" className="mt-1 w-5 h-5" />
        </button>
      </div>
    </>
  );
};
