import { z } from "zod";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string(),
});

export const privateConfig = privateConfigSchema.parse(process.env);