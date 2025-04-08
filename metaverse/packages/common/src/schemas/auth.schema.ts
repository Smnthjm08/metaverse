import { z } from "zod";

enum Roles {
  admin,
  user,
}

export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().optional(),
  role: z.enum(["admin", "user"]),
});

export const signInSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
});
