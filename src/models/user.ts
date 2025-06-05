import { roleSchema } from "./role";
import { z } from "zod";

export const userFormSchema = z.object({
    nome: z.string().min(2, "O nome deve possuir pelo menos 2 caracteres"),
    email: z.string().email(),
    password: z.string().optional().refine(
        (val) => !val || val.length >= 6
    ),
    telefone: z.string().min(1),
    role: roleSchema
})

export type UserForm = z.infer<typeof userFormSchema>

export interface User extends UserForm {
    id: number;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}
