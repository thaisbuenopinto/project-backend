import z from "zod";

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface LoginOutputDTO {
  token: string;
}

const customErrorMessages = {
  stringTooShort: " A senha deve conter pelo menos 8 caracteres.",
  invalidEmail: "Formato do Email inválido.",
};

export const LoginSchema = z
  .object({
    email: z.string().email(customErrorMessages.invalidEmail),
    password: z.string().min(8, customErrorMessages.stringTooShort),
  })
  .transform((data) => data as LoginInputDTO);
