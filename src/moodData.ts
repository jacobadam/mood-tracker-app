import pleasantMood from "./assets/lottie/pleasant.json";
import sadMood from "./assets/lottie/sad.json";
import excitedMood from "./assets/lottie/excited.json";

export interface Mood {
  id: number;
  type: "PLEASANT" | "SAD" | "EXCITED";
  createdAt: string;
  lottie: any;
}

export const moodsData: Mood[] = [
  {
    id: 1,
    type: "PLEASANT",
    createdAt: "2025-01-25T20:37:07.398Z",
    lottie: pleasantMood,
  },
  {
    id: 2,
    type: "EXCITED",
    createdAt: "2025-01-25T20:45:00.733Z",
    lottie: excitedMood,
  },
  {
    id: 3,
    type: "EXCITED",
    createdAt: "2025-01-25T20:47:27.355Z",
    lottie: excitedMood,
  },
  {
    id: 4,
    type: "EXCITED",
    createdAt: "2025-01-25T20:47:33.048Z",
    lottie: excitedMood,
  },
  {
    id: 5,
    type: "EXCITED",
    createdAt: "2025-01-25T20:47:38.726Z",
    lottie: excitedMood,
  },
  {
    id: 6,
    type: "EXCITED",
    createdAt: "2025-01-25T20:47:47.752Z",
    lottie: excitedMood,
  },
  {
    id: 7,
    type: "SAD",
    createdAt: "2025-01-27T21:48:15.049Z",
    lottie: sadMood,
  },
  {
    id: 8,
    type: "PLEASANT",
    createdAt: "2025-01-28T10:37:07.398Z",
    lottie: pleasantMood,
  },
  {
    id: 9,
    type: "EXCITED",
    createdAt: "2025-01-28T10:45:00.733Z",
    lottie: excitedMood,
  },
  {
    id: 10,
    type: "SAD",
    createdAt: "2025-01-29T09:47:27.355Z",
    lottie: sadMood,
  },
  {
    id: 11,
    type: "PLEASANT",
    createdAt: "2025-01-29T09:47:33.048Z",
    lottie: pleasantMood,
  },
  {
    id: 12,
    type: "EXCITED",
    createdAt: "2025-01-30T15:47:38.726Z",
    lottie: excitedMood,
  },
];
