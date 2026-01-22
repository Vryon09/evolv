export const MOODS = {
  MISERABLE: {
    emoji: "😭",
    label: "miserable",
    description: "Feeling awful, very sad, stressed, hopeless",
    value: 1,
  },
  BAD: {
    emoji: "😞",
    label: "bad",
    description: "Feeling down, frustrated, annoyed",
    value: 2,
  },
  DISPLEASED: {
    emoji: "😕",
    label: "displeased",
    description: "Slightly off, a bit irritable or tired",
    value: 3,
  },
  OKAY: {
    emoji: "😐",
    label: "okay",
    description: "Neither good nor bad, just normal",
    value: 4,
  },
  GOOD: {
    emoji: "😀",
    label: "good",
    description: "Mildly happy, content, satisfied",
    value: 5,
  },
  HAPPY: {
    emoji: "😁",
    label: "happy",
    description: "Cheerful, positive, motivated",
    value: 6,
  },
  JOYFUL: {
    emoji: "😆",
    label: "joyful",
    description: "Excited, joyful, energetic, very satisfied",
    value: 7,
  },
} as const;

export type MoodKey = keyof typeof MOODS;
export type MoodValue = (typeof MOODS)[MoodKey];
