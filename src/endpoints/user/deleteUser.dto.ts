import z from "zod";

export interface DeleteUserInputDTO {
  email: string;
  token: string;
}

export interface DeleteUserOutputDTO {
  message: string;
}

export const DeleteUserSchema = z
  .object({
    email: z.string().email(),
    token: z.string().min(1),
  })
  .transform((data) => data as DeleteUserInputDTO);
