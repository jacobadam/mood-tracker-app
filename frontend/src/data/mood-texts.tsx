import { MoodType } from "../types/mood-types";

export const moodTexts = {
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
