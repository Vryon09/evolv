export const MOODS = {
  MISERABLE: {
    emoji: "😭",
    label: "miserable",
    description: "Feeling awful, very sad, stressed, hopeless",
  },
  BAD: {
    emoji: "😞",
    label: "bad",
    description: "Feeling down, frustrated, annoyed",
  },
  DISPLEASED: {
    emoji: "😕",
    label: "displeased",
    description: "Slightly off, a bit irritable or tired",
  },
  OKAY: {
    emoji: "😐",
    label: "okay",
    description: "Neither good nor bad, just normal",
  },
  GOOD: {
    emoji: "😀",
    label: "good",
    description: "Mildly happy, content, satisfied",
  },
  HAPPY: {
    emoji: "😁",
    label: "happy",
    description: "Cheerful, positive, motivated",
  },
  JOYFUL: {
    emoji: "😆",
    label: "joyful",
    description: "Excited, joyful, energetic, very satisfied",
  },
} as const;

export type MoodKey = keyof typeof MOODS;
export type MoodValue = (typeof MOODS)[MoodKey];
