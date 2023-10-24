import z from "zod";

export interface GetUserByTokenInputDTO {
  token: string;
}

export type GetUserByTokenOutputDTO = {
  id: string;
  role: string;
};

export const GetUserByTokenSchema = z
  .object({
    token: z.string().min(2).optional(),
  })
  .transform((data) => data as GetUserByTokenInputDTO);
