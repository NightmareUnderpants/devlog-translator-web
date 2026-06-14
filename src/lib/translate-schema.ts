import { z } from "zod";

export const translateRequestSchema = z.object({
  sourceLanguageCode: z.string().trim().optional(),
  targetLanguageCode: z.string().trim().min(2),
  texts: z.array(z.string().trim().min(1)).min(1).max(10),
});

export type TranslateRequest = z.infer<typeof translateRequestSchema>;
