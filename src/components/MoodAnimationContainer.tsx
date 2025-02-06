import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { PleasantMoodConfig } from "../mood-configs/PleasantMoodConfig";
import { SadMoodConfig } from "../mood-configs/SadMoodConfig";
import { ExcitedMoodConfig } from "../mood-configs/ExcitedMoodConfig";
import Lottie from "react-lottie";
import pleasantLottie from "../assets/lottie/pleasant.json";
import sadLottie from "../assets/lottie/sad.json";
import excitedLottie from "../assets/lottie/excited.json";
import { MoodConfig } from "../types/mood-config-types";
import { MoodType } from "../types/mood-types";
import { LottieData } from "../types/lottie-types";

type MoodProps = {
  newMood?: MoodType;
};

const moodTexts = {
  [MoodType.PLEASANT]: {
    title: "You're feeling pleasant",
    description: (
      <>
        Feeling on top of the world, are we? Must be
        <br />
        all those endorphins doing their happy dance!
      </>
    ),
    color: "text-midnight-400",
  },
  [MoodType.SAD]: {
    title: "You're feeling sad",
    description: (
      <>
        Got the blues, huh? Remember, even clouds <br />
        have silver linings. We’re here for you.
      </>
    ),
    color: "text-white",
  },
  [MoodType.EXCITED]: {
    title: "You're feeling excited",
    description: (
      <>
        Buckle up, buttercup! Someone's got <br /> an extra sparkle in their
        step today!
      </>
    ),
    color: "text-white",
  },
};

const moodConfigs: Record<MoodType, MoodConfig> = {
  [MoodType.PLEASANT]: PleasantMoodConfig,
  [MoodType.SAD]: SadMoodConfig,
  [MoodType.EXCITED]: ExcitedMoodConfig,
};

const lottieMap: Record<MoodType, LottieData> = {
  [MoodType.PLEASANT]: pleasantLottie,
  [MoodType.SAD]: sadLottie,
  [MoodType.EXCITED]: excitedLottie,
};

const MoodAnimationContainer: React.FC<MoodProps> = ({
  newMood = MoodType.PLEASANT,
}) => {
  const [currentConfig, setCurrentConfig] = useState<MoodConfig>(
    moodConfigs[newMood]
  );

  const [exit, setExit] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    `linear-gradient(${moodConfigs[newMood].targetColors})`
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieMap[newMood],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const backgroundColor = moodConfigs[newMood].targetColors;

    setBackgroundColor(backgroundColor);
    if (newMood && newMood !== currentConfig.id) {
      gsap.to(backgroundRef.current, {
        duration: 5,
        backgroundImage: `linear-gradient(${backgroundColor})`,
        ease: "power2.inOut",
      });

      if (newMood === MoodType.EXCITED) {
        gsap.to(".lottie-container", {
          rotation: 360,
          duration: 2,
          ease: "power2.inOut",
        });
      }

      setExit(true);
    }
  }, [newMood]);

  const handleExitComplete = () => {
    if (newMood && moodConfigs[newMood]) {
      setCurrentConfig(() => moodConfigs[newMood]);
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
            newMood === MoodType.PLEASANT ? "text-midnight-300" : "text-white"
          }`}
        >
          CURRENT MOOD
        </p>

        <p
          className={`text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold tracking-[-0.015em] text-center mb-0 mt-4 ${moodTexts[newMood].color}`}
        >
          {moodTexts[newMood].title}
        </p>
        <p
          className={`text-sm md:text-base 2xl:text-lg tracking-[-0.01em] text-center mb-8 ${moodTexts[newMood].color}`}
        >
          {moodTexts[newMood].description}
        </p>

        <div className="lottie-container w-24 h-24 md:w-40 md:h-40 2xl:w-56 2xl:h-56">
          <Lottie animationData={excitedLottie} options={defaultOptions} />
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
              currentConfig.elements.map((element: any) => {
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
            (gradient: any, index: number) => (
              <linearGradient
                key={index}
                id={gradient.id}
                x1={gradient.x1}
                y1={gradient.y1}
                x2={gradient.x2}
                y2={gradient.y2}
                gradientUnits="userSpaceOnUse"
              >
                {gradient.stops.map((stop: any, index: number) => (
                  <stop
                    key={index}
                    offset={stop.offset}
                    stopColor={stop.stopColor}
                    stopOpacity={stop.stopOpacity}
                  />
                ))}
              </linearGradient>
            )
          )}
          <clipPath id="clip0_51_4607">
            <rect width={460} height={430} rx={40} fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </div>
  );
};

export default MoodAnimationContainer;
