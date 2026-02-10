import z from "zod";

const sleepSchema = z.object({
  bedTime: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), "Invalid bed time"),
  wakeTime: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), "Invalid wake time"),
  quality: z.number().min(1).max(4),
});

const habitSchema = z.object({
  habitId: z.string(),
  isCompleted: z.boolean(),
});

const habitsMoodImpactSchema = z.object({
  habitId: z.string(),
  moodImpact: z.number(),
  title: z.string(),
});

export const createMoodSchema = z.object({
  mood: z.enum([
    "MISERABLE",
    "BAD",
    "DISPLEASED",
    "OKAY",
    "GOOD",
    "HAPPY",
    "JOYFUL",
  ]),
  stressLevel: z.number().min(1).max(5),
  physicalActivity: z.number().min(1).max(4),
  sleep: sleepSchema,
  habits: z.array(habitSchema).default([]),
  habitsMoodImpact: z.array(habitsMoodImpactSchema).default([]),
});

export const updateMoodSchema = createMoodSchema.partial();

export type CreateMoodInput = z.infer<typeof createMoodSchema>;
export type UpdateMoodInput = z.infer<typeof updateMoodSchema>;
