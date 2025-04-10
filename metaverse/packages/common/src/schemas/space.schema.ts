import z from "zod";

export const spaceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  width: z.number().min(1),
  height: z.number().min(1),
  capacity: z.number().min(1),
  thumbnail: z.string().url().optional(),
});

