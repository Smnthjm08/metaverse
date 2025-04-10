import z from "zod";

export const spaceSchema = z.object({
  name: z.string().min(2, { message: "Atleast 2 character needed" }),
  width: z.number(),
  height: z.number(),
  thumbnail: z.string().optional(),
  creatorId: z.string(),
});
