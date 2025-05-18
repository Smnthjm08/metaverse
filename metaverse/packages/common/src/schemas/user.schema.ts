import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})