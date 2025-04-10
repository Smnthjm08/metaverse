import z from "zod";

export const userMetaDataSchema = z.object({
  avatarId: z.string(),
});