import z from "zod";
import { UserModel } from "../../models/User";

export interface GetUsersInputDTO {
  q: string;
}


export type GetUsersOutputDTO = UserModel[];

export const GetUsersSchema = z
  .object({
    q: z.string().min(2).optional(),
  })
  .transform((data) => data as GetUsersInputDTO);
