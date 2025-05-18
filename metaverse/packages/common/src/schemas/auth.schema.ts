import { z } from "zod";

enum Roles {
  admin,
  user,
}

export const signUpSchema = z
  .object({
    username: z.string().min(3).max(20),
    name: z.string().min(3).max(20),
    email: z.string().email().min(1).max(255),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userAgent: z.string().optional(),
    avatarId: z.number().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["conifrmPassword"],
  });

export const signInSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
});

