import z from "zod";
import { Posts } from "../../models/Posts";

export interface LikeDislikesInputDTO {
  like: boolean;
  id: string;
  token: string;
}

export type LikeDislikestOutputDTO = Posts;

export const LikeDislikesSchema = z
  .object({
    like: z.boolean(),
    id: z.string().min(1),
    token: z.string().min(1),
  })
  .transform((data) => data as LikeDislikesInputDTO);
