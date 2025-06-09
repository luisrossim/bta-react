import type { Stage } from "./stage";
import type { User } from "./user";

export interface ServiceOrderHistory {
   id: string;
   etapa: Stage
   atribuicoes: User[]
   observacoes?: string;
   concluidoEm?: Date;
   atualizadoEm?: Date;
   criadoEm: Date;
}
