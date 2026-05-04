export const MoodType = {
  SAD: "SAD",
  EXCITED: "EXCITED",
  PLEASANT: "PLEASANT",
} as const;

export type MoodTypeUnion = (typeof MoodType)[keyof typeof MoodType];

export type MoodEntry = {
  id: number;
  createdAt: string;
  type: MoodTypeUnion;
};

export type NewMood = {
  type: MoodTypeUnion;
};
