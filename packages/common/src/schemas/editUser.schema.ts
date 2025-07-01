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
  verified: z.boolean().optional(),
  avatar: z.string().optional(),
});