export const PHYSICALACTIVITIES = {
  1: { label: "none" },
  2: { label: "light" },
  3: { label: "moderate" },
  4: { label: "intense" },
} as const;

export type PhysicalActivityKey = keyof typeof PHYSICALACTIVITIES;
export type PhysicalActivityValue =
  (typeof PHYSICALACTIVITIES)[PhysicalActivityKey];
