import React from "react";
import CloseIcon from "../assets/close.svg";
import Lottie from "react-lottie";
import pleasantMood from "../assets/lottie/pleasant.json";
import sadMood from "../assets/lottie/sad.json";
import excitedMood from "../assets/lottie/excited.json";
interface ModalProps {
  onClose: () => void;
  onMoodSelect: (mood: "PLEASANT" | "EXCITED" | "SAD") => void;
}

interface MoodButton {
  animation: object;
  label: string;
  type: "PLEASANT" | "EXCITED" | "SAD";
}

const Modal: React.FC<ModalProps> = ({ onClose, onMoodSelect }) => {
  const moodButtons: MoodButton[] = [
    { animation: pleasantMood, label: "Pleasant", type: "PLEASANT" },
    { animation: excitedMood, label: "Excited", type: "EXCITED" },
    { animation: sadMood, label: "Sad", type: "SAD" },
  ];

  const handleMoodClick = (mood: "PLEASANT" | "EXCITED" | "SAD") => {
    onMoodSelect(mood);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-8 rounded-2xl bg-lavender-100 w-full sm:max-w-lg md:max-w-md lg:max-w-3xl xl:max-w-3xl sm:max-w-lg md:max-w-md lg:max-w-3xl xl:max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 appearance-none border-none bg-transparent p-0"
          aria-label="Close"
        >
          <img src={CloseIcon} alt="Close" className="w-6 h-6" />
        </button>

        <h2 className="text-lg lg:text-4xl font-extrabold mb-4 text-center pb-8">
          What mood are you in today?
        </h2>

        <div className="flex justify-between gap-4 mt-4">
          {moodButtons.map((mood, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center w-40 h-40 md:w-[252px] md:h-[242px] bg-white p-6 rounded-3xl hover:bg-lavender-200 border-none text-2xl"
              onClick={() => handleMoodClick(mood.type)}
            >
              <div className="w-8 h-8 sm:w-16 sm:h-16">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: mood.animation,
                    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                  }}
                />
              </div>
              <span className="mt-2 text-base font-bold h-4">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
