export enum MoodType {
  SAD = "SAD",
  EXCITED = "EXCITED",
  PLEASANT = "PLEASANT",
}
export interface Mood {
  id: number;
  createdAt: string;
  type: MoodType;
}

export type NewMood = {
  type: MoodType;
};
