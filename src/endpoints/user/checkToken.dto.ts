import z from "zod";

export interface CheckTokenInputDTO {
  token: string;
}

export interface CheckTokenOutputDTO {
  token: string;
}

export const CheckTokenSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as CheckTokenInputDTO);
