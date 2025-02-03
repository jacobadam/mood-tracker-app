import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodCard from "./MoodCard";
import pleasantLottie from "../assets/lottie/pleasant.json";
import sadLottie from "../assets/lottie/sad.json";
import excitedLottie from "../assets/lottie/excited.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMoods } from "../hooks/useMoods";

type MoodType = "PLEASANT" | "SAD" | "EXCITED";

interface Mood {
  id: number;
  type: MoodType;
  createdAt: string;
}

const moodMap: Record<MoodType, any> = {
  PLEASANT: pleasantLottie,
  SAD: sadLottie,
  EXCITED: excitedLottie,
};

const MoodLogContainer: React.FC<{
  selectedMood: "PLEASANT" | "SAD" | "EXCITED";
  onMoodSelect: (mood: "PLEASANT" | "SAD" | "EXCITED") => void;
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
    <div className="fade-mask flex flex-col gap-2 p-4 overflow-y-auto w-full no-scrollbar items-center">
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
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 2 },
            748: { slidesPerView: 5, spaceBetween: 8 },
            900: { slidesPerView: 6, spaceBetween: 8 },
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
                onMoodSelect={() => handleMoodCardSelect(mood)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="custom-pagination"></div>
    </div>
  );
};

export default MoodLogContainer;
