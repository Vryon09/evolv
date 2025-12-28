export const SLEEPQUALITIES = {
  1: {
    label: "poor",
  },
  2: {
    label: "fair",
  },
  3: {
    label: "good",
  },
  4: {
    label: "great",
  },
} as const;

export type SleepQualityKey = keyof typeof SLEEPQUALITIES;
export type SleepQualityValue = (typeof SLEEPQUALITIES)[SleepQualityKey];
