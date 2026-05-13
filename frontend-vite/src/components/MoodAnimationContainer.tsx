import { useState, useEffect, useRef, useEffectEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { PleasantMoodConfig } from "../mood-configs/PleasantMoodConfig";
import { SadMoodConfig } from "../mood-configs/SadMoodConfig";
import { ExcitedMoodConfig } from "../mood-configs/ExcitedMoodConfig";
import pleasantLottie from "../assets/pleasant.json";
import sadLottie from "../assets/sad.json";
import excitedLottie from "../assets/excited.json";
import type {
  MoodConfig,
  MoodElement,
  LinearGradientStop,
  LinearGradient,
} from "../types/mood-config-types";
import type { MoodTypeUnion } from "../types/mood-types";
import type { LottieData } from "../types/lottie-types";
import { moodTexts } from "../data/mood-texts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type MoodProps = {
  mood?: MoodTypeUnion;
};

const moodConfigs: Record<MoodTypeUnion, MoodConfig> = {
  ["PLEASANT"]: PleasantMoodConfig,
  ["SAD"]: SadMoodConfig,
  ["EXCITED"]: ExcitedMoodConfig,
};

const lottieMap: Record<MoodTypeUnion, LottieData> = {
  ["PLEASANT"]: pleasantLottie,
  ["SAD"]: sadLottie,
  ["EXCITED"]: excitedLottie,
};

export const MoodAnimationContainer = ({ mood = "PLEASANT" }: MoodProps) => {
  const [currentConfig, setCurrentConfig] = useState<MoodConfig>(
    moodConfigs[mood],
  );

  const [exit, setExit] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState<string[] | string>(
    `linear-gradient(${moodConfigs[mood].targetColors})`,
  );

  console.log("hit outside of useEffect");

  const updateBackgroundColor = useEffectEvent(
    (updatedBackgroundColor: string[]) => {
      console.log(updatedBackgroundColor, "<-- BG COLOR In useEffectEvent");
      setBackgroundColor(updatedBackgroundColor);
    },
  );

  useEffect(() => {
    console.log("hit inside useEffect");

    if (mood && mood !== currentConfig.id) {
      console.log("trigger inside cond");
      const backgroundColor = moodConfigs[mood].targetColors;

      updateBackgroundColor(backgroundColor);

      gsap.to(backgroundRef.current, {
        duration: 5,
        backgroundImage: `linear-gradient(${backgroundColor})`,
        ease: "power2.inOut",
      });

      if (mood === "EXCITED") {
        gsap.set(".lottie-container", { rotation: 0 });
        gsap.to(".lottie-container", {
          rotation: 360,
          duration: 2,
          ease: "power2.inOut",
        });
      }

      setExit(true);
    }
  }, [mood, currentConfig.id]);

  const handleExitComplete = () => {
    if (mood && moodConfigs[mood]) {
      setCurrentConfig(() => moodConfigs[mood]);
    }
    setExit(false);
  };

  return (
    <div
      ref={backgroundRef}
      style={{
        backgroundImage: backgroundColor,
      }}
      className="w-full h-full rounded-3xl overflow-hidden relative"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <p
          className={`text-xs md:text-sm font-semibold tracking-[0.1em] text-center mb-0 ${
            mood === "PLEASANT" ? "text-midnight-300" : "text-white"
          }`}
        >
          CURRENT MOOD
        </p>

        <p
          className={`text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold tracking-[-0.015em] text-center mb-0 mt-4 ${moodTexts[mood].color}`}
        >
          {moodTexts[mood].title}
        </p>
        <p
          className={`text-sm md:text-base 2xl:text-lg tracking-[-0.01em] text-center mb-8 ${moodTexts[mood].color}`}
        >
          {moodTexts[mood].description}
        </p>

        <div className="lottie-container w-24 h-24 sm:w-40 sm:h-40 2xl:w-56 2xl:h-56">
          <DotLottieReact data={lottieMap[mood]} autoplay loop />
        </div>
      </div>

      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 460 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <motion.g id="BackgroundGroup">
            <motion.rect id="Background" width={460} height={430} />
          </motion.g>

          <AnimatePresence onExitComplete={handleExitComplete}>
            {!exit &&
              currentConfig.elements.map((element: MoodElement) => {
                if (element.type === "ellipse") {
                  return (
                    <motion.ellipse
                      key={currentConfig.id + element.id}
                      cx={element.cx}
                      cy={element.cy}
                      rx={element.rx}
                      ry={element.ry}
                      fill={element.fill}
                      initial={element.initial}
                      animate={element.animate}
                      exit={element.exit}
                      transition={element.transition}
                    />
                  );
                } else {
                  return (
                    <motion.path
                      key={currentConfig.id + element.id}
                      id={element.id}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d={element.d}
                      fill={element.fill}
                      initial={element.initial}
                      animate={element.animate}
                      exit={element.exit}
                      transition={element.transition}
                    />
                  );
                }
              })}
          </AnimatePresence>
        </g>
        <defs>
          {Object.values(currentConfig.linearGradients).map(
            (gradient: LinearGradient, index: number) => (
              <linearGradient
                key={index}
                id={gradient.id}
                x1={gradient.x1}
                y1={gradient.y1}
                x2={gradient.x2}
                y2={gradient.y2}
                gradientUnits="userSpaceOnUse"
              >
                {gradient.stops.map(
                  (stop: LinearGradientStop, index: number) => (
                    <stop
                      key={index}
                      offset={stop.offset}
                      stopColor={stop.stopColor}
                      stopOpacity={stop.stopOpacity}
                    />
                  ),
                )}
              </linearGradient>
            ),
          )}
          <clipPath id="clip0_51_4607">
            <rect width={460} height={430} rx={40} fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </div>
  );
};
