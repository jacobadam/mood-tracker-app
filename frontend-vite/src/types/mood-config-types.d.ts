export type LinearGradientStop = {
  stopColor: string;
  offset?: number;
  stopOpacity?: number;
};

export type LinearGradient = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stops: LinearGradientStop[];
};

export type MoodElement = {
  id: string;
  type: "ellipse" | "path";
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  d?: string;
  fill: string;
  initial?: Record<string, TargetAndTransition>;
  animate?: Record<string, TargetAndTransition>;
  exit?: Record<string, TargetAndTransition>;
  transition?: Record<string, TargetAndTransition>;
};

export type MoodConfig = {
  id: string;
  backgroundGradientId: string;
  targetColors: string[];
  elements: MoodElement[];
  linearGradients: LinearGradient[];
};
