export enum MoodType {
  SAD = "SAD",
  EXCITED = "EXCITED",
  PLEASANT = "PLEASANT",
}

export interface Mood {
  createdAt: string;
  id: number;
  type: MoodType;
}
