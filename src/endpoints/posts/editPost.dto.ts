import z from "zod";

export interface EditPostInputDTO {
  token: string;
  idToEdit: string;
  content: string;
}

export interface EditPostOutputDTO {
  content: string;
}

const customErrorMessages = {
  stringTooShort:
    "O novo conteúdo do seu Post deve ter pelo menos 1 caractere.",
};

export const EditPostSchema = z
  .object({
    token: z.string().min(1),
    idToEdit: z.string().min(1),
    content: z.string().min(1, customErrorMessages.stringTooShort),
  })
  .transform((data) => data as EditPostInputDTO);
