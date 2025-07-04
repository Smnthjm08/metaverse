import z from "zod";

export const editUserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  verified: z.boolean(),
  avatar: z.string().optional(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  verified: z.boolean().optional(),
})