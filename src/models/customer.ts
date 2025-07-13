import { z } from "zod";
import { createAddressSchema } from "./address";
import type { ServiceOrder } from "./service-order";

export const customerFormSchema = z.object({
    nome: z.string().nonempty(),
    telefone: z.string().nonempty(),
    cpf: z.string().length(11),
    endereco: createAddressSchema
})

export type CustomerForm = z.infer<typeof customerFormSchema>;

export interface Customer extends CustomerForm {
    id: number
    ordemServico: ServiceOrder[]
    atualizadoEm: Date
    criadoEm: Date
}
