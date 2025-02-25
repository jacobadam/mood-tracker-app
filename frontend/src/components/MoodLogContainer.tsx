import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodCard from "./MoodCard";
import pleasantLottie from "../../src/assets/lottie/pleasant.json";
import sadLottie from "../../src/assets/lottie/sad.json";
import excitedLottie from "../../src/assets/lottie/excited.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMoods } from "../hooks/useMoods";
import { MoodType, Mood } from "../types/mood-types";
import { LottieData } from "../types/lottie-types";

const moodMap: Record<MoodType, LottieData> = {
  [MoodType.PLEASANT]: pleasantLottie,
  [MoodType.SAD]: sadLottie,
  [MoodType.EXCITED]: excitedLottie,
};

const MoodLogContainer: React.FC<{
  selectedMood: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}> = ({ onMoodSelect }) => {
  const { moods, loading, error } = useMoods();
  const [selectedMoodId, setSelectedMoodId] = useState<number | null>(null);

  const handleMoodCardSelect = (mood: Mood) => {
    setSelectedMoodId(mood.id);
    onMoodSelect(mood.type);
  };

  if (loading) return <div>Loading moods...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-2 overflow-y-auto w-full no-scrollbar fade-mask">
      <div className="hidden lg:flex flex-col gap-2 w-full">
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

      <div className="w-full p-0 lg:hidden">
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
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 8 },
            768: { slidesPerView: 5, spaceBetween: 12 },
            900: { slidesPerView: 6, spaceBetween: 12 },
          }}
        >
          {moods.map((mood, index) => (
            <SwiperSlide
              key={mood.id || index}
              className="group"
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

export default MoodLogContainer;
