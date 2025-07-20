import z from "zod";
import type { Stage } from "./stage";
import type { User } from "./user";

export interface AtribuicaoRequest {
   historyId: string
   userId: number
}

export interface Atribuicao {
   usuario: User
}

export interface OrderHistory {
   id: string;
   etapa: Stage
   atribuicoes: Atribuicao[]
   observacoes?: string;
   concluidoEm?: Date;
   atualizadoEm?: Date;
   criadoEm: Date;
}

export const createAtribuicaoSchema = z.object({
   userId: z.number()
})

export type CreateAtribuicao = z.infer<typeof createAtribuicaoSchema> 