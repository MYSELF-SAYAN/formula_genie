import { z } from "zod";

export const generateFormattedBody = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long").max(500, "Prompt must be less than 500 characters"),
  platform: z.enum(["google-sheets", "excel", "both"]),
  userId: z.string().min(1, "User ID is required"),
});

export type GenerateRequest = z.infer<typeof generateFormattedBody>;
