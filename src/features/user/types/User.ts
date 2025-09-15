import { z } from 'zod';
import { roleSchema } from './Role';

const userSchema = z.object({
    nome: z.string().min(2, 'O nome deve possuir pelo menos 2 caracteres'),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string({ message: 'Telefone inválido' }),
    role: roleSchema,
});

export const updateUserSchema = userSchema.extend({
    password: z
        .string()
        .min(6, 'A senha deve possuir pelo menos 6 caracteres')
        .nullable()
        .optional(),
});

export const createUserSchema = userSchema.extend({
    password: z.string().min(6, 'A senha deve possuir pelo menos 6 caracteres'),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;

export interface User extends CreateUser {
    id: string;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}
