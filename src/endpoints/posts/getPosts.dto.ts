import z from "zod";
import { GetPostsModel } from "../../models/Posts";

export interface GetPostsInputDTO {
  token: string;
}

export type GetPostsOutputDTO = GetPostsModel[];

export const GetPostsSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetPostsInputDTO);
