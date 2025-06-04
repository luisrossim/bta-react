import type { Role } from "./role";
import { z } from "zod";

export interface User {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    role: Role;
    atualizadoEm: Date;
    criadoEm: Date;
}

export const createUserSchema = z.object({
    nome: z.string().min(2, "O nome deve possuir pelo menos 2 caracteres"),
    email: z.string().email(),
    password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
    telefone: z.string().min(1),
    role: z.object({
        connect: z.object({
            id: z.coerce.number()
        })
    })
})

export type CreateUser = z.infer<typeof createUserSchema>