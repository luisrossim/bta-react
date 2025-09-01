import { z } from 'zod';
import { roleSchema } from './Role';

export const updateUserSchema = z.object({
    nome: z.string().min(2, 'O nome deve possuir pelo menos 2 caracteres'),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string().min(1, { message: 'Telefone inválido' }),
    password: z
        .string()
        .transform((val) => (val === '' ? null : val))
        .nullable()
        .refine((val) => val === null || val.length >= 6, {
            message: 'A senha deve ter pelo menos 6 caracteres',
        })
        .optional(),
    role: roleSchema,
});

export const createUserSchema = z.object({
    nome: z.string().min(2, 'O nome deve possuir pelo menos 2 caracteres'),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string().min(1, { message: 'Telefone inválido' }),
    password: z
        .string({ message: 'Senha é obrigatória' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    role: roleSchema,
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export interface User extends CreateUser {
    id: string;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}
