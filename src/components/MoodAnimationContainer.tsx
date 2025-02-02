import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PleasantMoodConfig } from "../mood-configs/PleasantMoodConfig";
import { SadMoodConfig } from "../mood-configs/SadMoodConfig";
import { ExcitedMoodConfig } from "../mood-configs/ExcitedMoodConfig";
import { MoodConfig } from "../types/mood-config-types";
import gsap from "gsap";

type MoodProps = {
  newMood?: "PLEASANT" | "SAD" | "EXCITED";
};

const MoodAnimationContainer: React.FC<MoodProps> = ({
  newMood = "PLEASANT",
}) => {
  const moodConfigs: Record<string, MoodConfig> = useMemo(
    () => ({
      PLEASANT: PleasantMoodConfig,
      SAD: SadMoodConfig,
      EXCITED: ExcitedMoodConfig,
    }),
    []
  );

  const [currentConfig, setCurrentConfig] = useState<MoodConfig>(
    moodConfigs["PLEASANT"]
  );

  const [exit, setExit] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    `linear-gradient(${moodConfigs["PLEASANT"].targetColors})`
  );

  useEffect(() => {
    const backgroundColor = moodConfigs[newMood].targetColors;

    setBackgroundColor(backgroundColor);
    if (newMood && newMood !== currentConfig.id) {
      gsap.to(backgroundRef.current, {
        duration: 5,
        backgroundImage: `linear-gradient(${backgroundColor})`,
        ease: "power2.inOut",
      });

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
        width: "100%",
        height: "100%",
        backgroundImage: backgroundColor,
      }}
    >
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
                      key={element.id}
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
                      key={element.id}
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
          {Object.values(currentConfig.linearGradients).map((gradient: any) => (
            <linearGradient
              key={gradient.id}
              id={gradient.id}
              x1={gradient.x1}
              y1={gradient.y1}
              x2={gradient.x2}
              y2={gradient.y2}
              gradientUnits="userSpaceOnUse"
            >
              {gradient.stops.map((stop: any, index: number) => (
                <stop
                  key={stop.id}
                  offset={stop.offset}
                  stopColor={stop.stopColor}
                  stopOpacity={stop.opacity}
                />
              ))}
            </linearGradient>
          ))}
          <clipPath id="clip0_51_4607">
            <rect width={460} height={430} rx={40} fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </div>
  );
};

export default MoodAnimationContainer;
