import z from "zod";

export const createJournalSchema = z.object({
  title: z.string().max(100).default(""),
  content: z.string().max(5000).default(""),
  tags: z.array(z.string().trim().toLowerCase()).max(5).default([]),
});

export const updateJournalSchema = createJournalSchema.partial();

export type CreateJournalInput = z.infer<typeof createJournalSchema>;
export type UpdateJournalInput = z.infer<typeof updateJournalSchema>;
