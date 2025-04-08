import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signInSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
});

export const createRoomSchema = z.object({
  slug: z.string().min(2).max(30),
  //   password: z.string(),
});
