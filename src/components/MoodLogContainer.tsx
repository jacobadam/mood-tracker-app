import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodCard from "./MoodCard";
import { fetchMoods } from "../api/moodTrackerApi";
import { connectWebSocket, disconnectWebSocket } from "../utils/websocket";
import pleasantLottie from "../assets/lottie/pleasant.json";
import sadLottie from "../assets/lottie/sad.json";
import excitedLottie from "../assets/lottie/excited.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const MoodLogContainer: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
          console.error("API key is missing.");
          return;
        }

        const fetchedMoods: Mood[] = await fetchMoods(apiKey);
        setMoods(fetchedMoods);
      } catch (error) {
        console.error("Failed to fetch moods:", (error as Error).message);
      }
    };

    loadMoods();

    const handleNewMood = (newMood: Mood) => {
      setMoods((prevMoods) => [
        {
          ...newMood,
          lottie: moodMap[newMood.type],
          date: new Date(newMood.createdAt).toLocaleDateString(),
        },
        ...prevMoods,
      ]);
    };

    connectWebSocket(handleNewMood);

    return () => {
      disconnectWebSocket();
    };
  }, []);

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
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full p-8">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView="auto"
          navigation={{
            nextEl: ".portfolio-button-next",
            prevEl: ".portfolio-button-prev",
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            748: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
          }}
        >
          {moods.map((mood, index) => (
            <SwiperSlide
              key={index}
              className="group"
              aria-label={`Slide ${index + 1}`}
            >
              <MoodCard
                lottie={moodMap[mood.type]}
                mood={mood.type}
                date={mood.createdAt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoodLogContainer;
