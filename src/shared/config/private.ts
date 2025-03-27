import { z } from "zod";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
<<<<<<< HEAD
  NEXTAUTH_SECRET: z.string(),
=======
  NEXT_AUTH_SECRET: z.string(),
  NEXT_AUTH_URL: z.string().url(),
  ADMIN_EMAIL: z.string().email(),
>>>>>>> master
});

export const privateConfig = privateConfigSchema.parse(process.env);