import z from "zod";

export interface EditUserInputDTO {
  token: string;
  emailToEdit: string;
  name: string;
  email: string;
  password: string;
}

export interface EditUserOutputDTO {
  message: string;
}

export const EditUserSchema = z
  .object({
    token: z.string().min(1),
    emailToEdit: z.string().email(),
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
  })
  .transform((data) => data as EditUserInputDTO);
