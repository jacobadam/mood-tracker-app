// src/moodData.ts

import pleasantMood from "./assets/lottie/pleasant.json";
import sadMood from "./assets/lottie/sad.json";
import excitedMood from "./assets/lottie/excited.json";

export interface Mood {
  id: number;
  type: "PLEASANT" | "SAD" | "EXCITED";
  createdAt: string;
  lottie: any;
  date: string;
}

export const moodsData: Mood[] = [
  {
    id: 1,
    type: "PLEASANT",
    createdAt: "2025-01-01T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-01T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 2,
    type: "SAD",
    createdAt: "2025-01-02T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-02T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 3,
    type: "EXCITED",
    createdAt: "2025-01-03T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-03T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 4,
    type: "PLEASANT",
    createdAt: "2025-01-04T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-04T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 5,
    type: "SAD",
    createdAt: "2025-01-05T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-05T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 6,
    type: "EXCITED",
    createdAt: "2025-01-06T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-06T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 7,
    type: "PLEASANT",
    createdAt: "2025-01-07T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-07T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 8,
    type: "SAD",
    createdAt: "2025-01-08T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-08T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 9,
    type: "EXCITED",
    createdAt: "2025-01-09T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-09T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 10,
    type: "PLEASANT",
    createdAt: "2025-01-10T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-10T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 11,
    type: "SAD",
    createdAt: "2025-01-11T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-11T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 12,
    type: "EXCITED",
    createdAt: "2025-01-12T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-12T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 13,
    type: "PLEASANT",
    createdAt: "2025-01-13T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-13T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 14,
    type: "SAD",
    createdAt: "2025-01-14T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-14T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 15,
    type: "EXCITED",
    createdAt: "2025-01-15T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-15T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 16,
    type: "PLEASANT",
    createdAt: "2025-01-16T00:00:00Z",
    lottie: pleasantMood,
    date: new Date("2025-01-16T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 17,
    type: "SAD",
    createdAt: "2025-01-17T00:00:00Z",
    lottie: sadMood,
    date: new Date("2025-01-17T00:00:00Z").toLocaleDateString(),
  },
  {
    id: 18,
    type: "EXCITED",
    createdAt: "2025-01-18T00:00:00Z",
    lottie: excitedMood,
    date: new Date("2025-01-18T00:00:00Z").toLocaleDateString(),
  },
];
