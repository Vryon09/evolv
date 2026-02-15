import z from "zod";

export const createPomodoroSchema = z.object({
  pomodoro: z.number().default(25),
  short: z.number().default(5),
  long: z.number().default(15),
  autoPomodoro: z.boolean().default(false),
  autoBreak: z.boolean().default(false),
  longBreakInterval: z.number().default(4),
});

export const updatePomodoroSchema = createPomodoroSchema.partial();

export type CreatePomodoroInput = z.infer<typeof createPomodoroSchema>;
export type UpdatePomodoroInput = z.infer<typeof updatePomodoroSchema>;
