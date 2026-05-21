import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodCard } from "./MoodCard";
import pleasantLottie from "../assets/pleasant.json";
import sadLottie from "../assets/sad.json";
import excitedLottie from "../assets/excited.json";
import { useMoods } from "../hooks/useMoods";
import type { MoodTypeUnion, MoodEntry } from "../types/mood-types";
import type { LottieData } from "../types/lottie-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const moodMap: Record<MoodTypeUnion, LottieData> = {
  ["PLEASANT"]: pleasantLottie,
  ["SAD"]: sadLottie,
  ["EXCITED"]: excitedLottie,
};

type MoodLogContainerProps = {
  onMoodSelect: (mood: MoodTypeUnion) => void;
};

export const MoodLogContainer = ({ onMoodSelect }: MoodLogContainerProps) => {
  const { moods, loading, error } = useMoods();
  const [selectedMoodId, setSelectedMoodId] = useState<number | null>(null);

  const handleMoodCardSelect = (mood: MoodEntry) => {
    setSelectedMoodId(mood.id);
    onMoodSelect(mood.type);
  };

  if (loading)
    return <div className="lg:mb-4 font-semibold">Loading moods...</div>;
  if (error) return <div className="lg:mb-4 font-semibold">{error}</div>;

  return (
    <div className="flex flex-col gap-2 w-full h-full lg:h-full overflow-hidden items-center fade-mask">
      <div className="hidden lg:flex flex-col gap-2 w-full flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence initial={false}>
          {moods.map((mood) => (
            <motion.div
              key={mood.id}
              layout
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <MoodCard
                lottie={moodMap[mood.type]}
                mood={mood.type}
                date={mood.createdAt}
                isSelected={selectedMoodId === mood.id}
                moodId={mood.id}
                onMoodSelect={() => handleMoodCardSelect(mood)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full p-0 lg:hidden mt-6 shrink-0">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true,
            el: ".custom-pagination",
          }}
          loop={true}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={8}
        >
          {moods.map((mood, index) => (
            <SwiperSlide
              key={mood.id || index}
              className="group w-auto"
              aria-label={`Slide ${index + 1}`}
            >
              <MoodCard
                lottie={moodMap[mood.type]}
                mood={mood.type}
                date={mood.createdAt}
                isSelected={selectedMoodId === mood.id}
                moodId={mood.id}
                onMoodSelect={() => handleMoodCardSelect(mood)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="custom-pagination lg:hidden"></div>
    </div>
  );
};
