import React from "react";
// import Lottie from "react-lottie";
import pleasantMood from "../assets/pleasant.json";
import sadMood from "../assets/sad.json";
import excitedMood from "../assets/excited.json";
import { useAddMood } from "../hooks/useAddMood";
import type { MoodTypeUnion } from "../types/mood-types";

interface MoodSelectorModalProps {
  onClose: () => void;
  onMoodSelect: (mood: MoodTypeUnion) => void;
}
interface MoodButton {
  animation: object;
  label: string;
  type: MoodTypeUnion;
}

const MoodSelectorModal: React.FC<MoodSelectorModalProps> = ({
  onClose,
  onMoodSelect,
}) => {
  const { loading, error, postMood } = useAddMood();

  const moodButtons: MoodButton[] = [
    { animation: pleasantMood, label: "Pleasant", type: "PLEASANT" },
    { animation: excitedMood, label: "Excited", type: "EXCITED" },
    { animation: sadMood, label: "Sad", type: "SAD" },
  ];

  const handleMoodSelect = (mood: MoodTypeUnion) => {
    postMood(mood);
    onMoodSelect(mood);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative p-5 sm:p-8 rounded-2xl bg-lavender-100 md:w-full md:max-w-md lg:max-w-3xl xl:max-w-3xl sm:max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 appearance-none border-none bg-transparent p-0"
          aria-label="Close"
        >
          <img
            src={`${process.env.PUBLIC_URL}/close.svg`}
            alt="Close"
            className="w-6 h-6"
          />
        </button>

        <h2 className="text-lg lg:text-4xl font-extrabold mb-4 text-center pb-8">
          What mood are you in today?
        </h2>

        <div className="flex justify-between gap-4 mt-4">
          {moodButtons.map((mood, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center w-24 h-24 sm:w-40 sm:h-40 lg:w-[252px] lg:h-[242px] bg-white p-2 lg:p-6 rounded-3xl hover:bg-lavender-200 border-none text-base lg:text-2xl"
              onClick={() => handleMoodSelect(mood.type)}
            >
              <div className="w-8 h-8 sm:w-16 sm:h-16">
                {/* <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: mood.animation,
                    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                  }}
                /> */}
              </div>
              <span className="mt-2 text-base font-bold h-4 text-black">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default MoodSelectorModal;
