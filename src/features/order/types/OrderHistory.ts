import z from "zod";
import type { Stage } from "../../stages/types/Stage";
import type { User } from "../../user/types/User";

interface AtribuicaoRequest {
   historyId: string
   userId: number
}

interface Atribuicao {
   usuario: User
}

interface OrderHistory {
   id: string;
   etapa: Stage
   atribuicoes: Atribuicao[]
   observacoes?: string;
   concluidoPor: User;
   concluidoEm?: Date;
   atualizadoEm?: Date;
   criadoEm: Date;
}


const commentsHistorySchema = z.object({
  observacoes: z.string()
})

type CommentsHistory = z.infer<typeof commentsHistorySchema>


const createAtribuicaoSchema = z.object({
   userId: z.number()
})

type CreateAtribuicao = z.infer<typeof createAtribuicaoSchema>

export {
   type Atribuicao,
   type AtribuicaoRequest,
   type OrderHistory,
   type CommentsHistory,
   type CreateAtribuicao,
   commentsHistorySchema,
   createAtribuicaoSchema
}