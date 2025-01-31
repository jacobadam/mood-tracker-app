import { gsap } from "gsap";
import React from "react";

export type MoodElement = {
  id: string;
  type: string;
  props: React.SVGProps<SVGElement>;
  animation: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    loop?: gsap.TweenVars;
    exit?: gsap.TweenVars;
  };
};

export type MoodConfig = {
  id: string;
  backgroundGradientId: string;
  targetColors: string[];
  elements: MoodElement[];
  defs: React.ReactNode;
};
