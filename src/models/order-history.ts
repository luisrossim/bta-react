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
   concluidoPor: User;
   concluidoEm?: Date;
   atualizadoEm?: Date;
   criadoEm: Date;
}


export const commentsHistorySchema = z.object({
  observacoes: z.string()
})

export type CommentsHistory = z.infer<typeof commentsHistorySchema>


export const createAtribuicaoSchema = z.object({
   userId: z.number()
})

export type CreateAtribuicao = z.infer<typeof createAtribuicaoSchema> 