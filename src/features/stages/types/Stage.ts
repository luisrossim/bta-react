import type { User } from '@/features/user/types/User';
import z from 'zod';

const stageSchema = z.object({
    id: z.number(),
    descricao: z.string(),
});

type Stage = z.infer<typeof stageSchema> & {
    etapaUsuario: StageUser[];
};

interface StageUser {
    etapaId: number;
    userId: string;
    usuario: User;
}

const associateFormSchema = z.object({
    stageId: z.number({ message: 'Etapa inválida' }),
    userId: z.string({ message: 'Usuário inválido' }),
});

type AssociateForm = z.infer<typeof associateFormSchema>;

interface AssociatedUsers {
    stageId: number;
    users: Partial<User>[];
}

export {
    associateFormSchema,
    stageSchema,
    type AssociatedUsers,
    type AssociateForm,
    type Stage,
    type StageUser,
};
