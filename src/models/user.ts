import { roleSchema } from "./role";
import { z } from "zod";

export const updateUserSchema = z.object({
    nome: z.string().min(2, "O nome deve possuir pelo menos 2 caracteres"),
    email: z.string().email({ message: "Email inválido" }),
    telefone: z.string().min(1, { message: "Telefone inválido" }),
    role: roleSchema
})

export const createUserSchema = updateUserSchema.extend({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>

export interface User extends CreateUser {
    id: number;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}
