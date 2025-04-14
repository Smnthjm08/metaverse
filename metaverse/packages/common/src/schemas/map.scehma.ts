import z from "zod";

export const createMapSchema = z.object({
  thumbnail: z.string(),
  dimensions: z
    .string()
    .regex(
      /^\d{1,4}x\d{1,4}$/,
      "Expected format: WIDTHxHEIGHT with max 4 digits each (e.g., 100x100)"
    ),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});
