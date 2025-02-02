import { MoodConfig } from "../types/mood-config-types";

export const SadMoodConfig: MoodConfig = {
  id: "SAD",
  backgroundGradientId: "paint0_linear_51_4607",
  // targetColors: ["#195BD1", "#97A3FF"],
  elements: [
    {
      id: "Shape 2",
      type: "path",
      d: "M133.857 277.661C28.0058 233.868 -83.7275 366.588 -83.7275 366.588L-9.6366 471.773H516.026L518.005 378.514C518.005 378.514 498.418 375.967 490.753 374.177C374.711 347.088 241.111 322.035 133.857 277.661Z",
      fill: "url(#paint1_linear_51_4607)",
      initial: { y: 170 },
      animate: { y: 0, x: [0, -20, 0] },
      exit: { y: 170 },
      transition: {
        duration: 4,
        x: {
          duration: 6,
          repeat: Infinity,
        },
      },
    },
    {
      id: "Shape 1",
      type: "path",
      d: "M748.5 332.436C1022.21 330.665 1007 422.268 1007 422.268V567.509H-81L-75.8576 429.275C-75.8576 429.275 181.442 441.643 269.377 429.275C439.935 405.285 628.099 333.215 748.5 332.436Z",
      fill: "url(#paint2_linear_51_4607)",
      initial: { y: 50 },
      animate: { y: -30, x: [0, 20, 0] },
      exit: { y: 50, transition: { duration: 3 } },
      transition: {
        duration: 4,
        x: {
          duration: 6,
          repeat: Infinity,
        },
      },
    },
    {
      id: "Cloud 1",
      type: "path",
      d: "M14.8424 213.112H52.2629C63.7909 213.112 73.1361 202.961 73.1361 190.439C73.1361 177.917 63.7909 167.766 52.2629 167.766C48.7842 167.766 45.5042 168.691 42.6198 170.326C38.6035 157.672 27.5444 148.582 14.5307 148.582C-1.87447 148.582 -15.1735 163.027 -15.1735 180.847C-15.1735 181.212 -15.1679 181.576 -15.1568 181.938C-19.9456 184.733 -23.2016 190.225 -23.2016 196.543C-23.2016 205.694 -16.3724 213.112 -7.94814 213.112H14.5307",
      fill: "url(#paint3_linear_51_4607)",
      initial: { x: 80 },
      animate: { x: [0, 20, 0] },
      exit: { x: -80, transition: { duration: 3 } },
      transition: {
        duration: 5,
        x: {
          duration: 4,
          repeat: Infinity,
        },
      },
    },
    {
      id: "Cloud 2",
      type: "path",
      d: "M114.987 91.6434H146.726C156.503 91.6434 164.43 83.0279 164.43 72.4002C164.43 61.7724 156.503 53.157 146.726 53.157C143.775 53.157 140.993 53.9415 138.547 55.3292C135.14 44.5895 125.76 36.8743 114.722 36.8743C100.808 36.8743 89.5284 49.1347 89.5284 64.2588C89.5284 64.5688 89.5331 64.8776 89.5425 65.185C85.4808 67.5569 82.7192 72.2184 82.7192 77.581C82.7192 85.3474 88.5115 91.6434 95.6567 91.6434H114.722",
      fill: "url(#paint5_linear_51_4607)",
      initial: { x: 170 },
      animate: { x: [0, 20, 0] },
      exit: { x: -170, transition: { duration: 3 } },
      transition: {
        duration: 5,
        x: {
          duration: 4,
          repeat: Infinity,
        },
      },
    },
    {
      id: "Cloud 3",
      type: "path",
      d: "M462.481 156.715H396.456C376.116 156.715 359.627 139.058 359.627 117.276C359.627 95.4948 376.116 77.8373 396.456 77.8373C402.594 77.8373 408.381 79.4453 413.47 82.2893C420.557 60.2783 440.069 44.4658 463.031 44.4658C491.976 44.4658 515.441 69.5937 515.441 100.591C515.441 101.226 515.431 101.859 515.411 102.489C523.861 107.35 529.605 116.904 529.605 127.895C529.605 143.812 517.556 156.715 502.692 156.715H463.031C462.948 156.715 462.481 156.715 462.481 156.715H463.031H462.481Z",
      fill: "url(#paint5_linear_51_4607)",
      initial: { x: -130 },
      animate: { x: [0, 20, 0] },
      exit: { x: 130, transition: { duration: 3 } },
      transition: {
        duration: 5,
        x: {
          duration: 4,
          repeat: Infinity,
        },
      },
    },
  ],
  linearGradients: [
    {
      id: "paint0_linear_51_4607",
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 850,
      stops: [{ stopColor: "#195BD1" }, { offset: 1, stopColor: "#97A3FF" }],
    },
    {
      id: "paint1_linear_51_4607",
      x1: 217.139,
      y1: 266.796,
      x2: 217.139,
      y2: 471.773,
      stops: [{ stopColor: "#5F83ED" }, { offset: 1, stopColor: "#1F42A7" }],
    },
    {
      id: "paint2_linear_51_4607",
      x1: 463,
      y1: 345.722,
      x2: 463,
      y2: 567.509,
      stops: [{ stopColor: "#5F83ED" }, { offset: 1, stopColor: "#1F42A7" }],
    },
    {
      id: "paint3_linear_51_4607",
      x1: 73.1361,
      y1: 148.582,
      x2: 73.1361,
      y2: 213.112,
      stops: [
        { stopColor: "white" },
        { offset: 1, stopColor: "white", stopOpacity: 0.01 },
      ],
    },
    {
      id: "paint4_linear_51_4607",
      x1: 359.627,
      y1: 44.4658,
      x2: 359.627,
      y2: 156.715,
      stops: [
        { stopColor: "white" },
        { offset: 1, stopColor: "white", stopOpacity: 0.1 },
      ],
    },
    {
      id: "paint5_linear_51_4607",
      x1: 164.43,
      y1: 36.8743,
      x2: 164.43,
      y2: 91.6434,
      stops: [
        { stopColor: "white" },
        { offset: 1, stopColor: "white", stopOpacity: 0.1 },
      ],
    },
  ],
};
