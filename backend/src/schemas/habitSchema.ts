import z from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(200).default(""),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  tags: z.array(z.string().trim().toLowerCase()).max(5).default([]),
});

export const updateHabitSchema = createHabitSchema.partial();

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
