import z from "zod";
import { Posts } from "../../models/Posts";

export interface CreatePostInputDTO {
  token: string;
  content: string;
}

export type CreatePostOutputDTO = Posts;

const customErrorMessages = {
  stringTooShort: "O seu Post deve ter pelo menos 1 caractere.",
};

export const CreatePostSchema = z
  .object({
    token: z.string().min(1),
    content: z.string().min(1, customErrorMessages.stringTooShort),
  })
  .transform((data) => data as CreatePostInputDTO);
