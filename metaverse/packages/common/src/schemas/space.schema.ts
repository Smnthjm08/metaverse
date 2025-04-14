import z from "zod";

export const spaceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  // width: z.number().min(1),
  // height: z.number().min(1),
  mapId: z.string(),
  dimensions: z
    .string()
    .regex(
      /^\d{1,4}x\d{1,4}$/,
      "Expected format: WIDTHxHEIGHT with max 4 digits each (e.g., 100x100)"
    ),
  capacity: z.number().min(1),
  thumbnail: z.string().url().optional(),
});


export const createAvatarSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});
