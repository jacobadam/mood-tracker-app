import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import pleasantLottie from "../assets/pleasant.json";
import sadLottie from "../assets/sad.json";
import excitedLottie from "../assets/excited.json";
import { useAddMood } from "../hooks/useAddMood";
import type { MoodTypeUnion } from "../types/mood-types";
import type { LottieData } from "../types/lottie-types";

interface MoodSelectorModalProps {
  onClose: () => void;
  onMoodSelect: (mood: MoodTypeUnion) => void;
}
interface MoodButton {
  animation: MoodTypeUnion;
  label: string;
  type: MoodTypeUnion;
}

export const MoodSelectorModal = ({
  onClose,
  onMoodSelect,
}: MoodSelectorModalProps) => {
  const { loading, error, postMood } = useAddMood();

  const moodButtons: MoodButton[] = [
    { animation: "PLEASANT", label: "Pleasant", type: "PLEASANT" },
    { animation: "EXCITED", label: "Excited", type: "EXCITED" },
    { animation: "SAD", label: "Sad", type: "SAD" },
  ];

  const lottieMap: Record<MoodTypeUnion, LottieData> = {
    ["PLEASANT"]: pleasantLottie,
    ["SAD"]: sadLottie,
    ["EXCITED"]: excitedLottie,
  };

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
          <img src={"/close.svg"} alt="Close" className="w-6 h-6" />
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
                <DotLottieReact
                  data={lottieMap[mood.animation]}
                  autoplay
                  loop
                />
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
