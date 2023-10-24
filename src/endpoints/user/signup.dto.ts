import z from "zod";

export interface SignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignupOutputDTO {
  message: string;
  token: string;
}

const customErrorMessages = {
  stringTooShortName: "O nome deve conter pelo menos 2 caracteres.",
  stringTooShortPassword: "A senha deve conter pelo menos 8 caracteres.",
  invalidEmail: "Formato do Email inválido.",
};

export const SignupSchema = z
  .object({
    name: z.string().min(2, customErrorMessages.stringTooShortName),
    email: z.string().email(customErrorMessages.invalidEmail),
    password: z.string().min(8, customErrorMessages.stringTooShortPassword),
  })
  .transform((data) => data as SignupInputDTO);
