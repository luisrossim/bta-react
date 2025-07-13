import { z } from "zod";
import { createAddressSchema } from "./address";
import type { ServiceOrder } from "./service-order";

export const createCustomerSchema = z.object({
    nome: z.string().nonempty(),
    telefone: z.string().nonempty(),
    cpf: z.string().length(11),
    endereco: createAddressSchema
})

export type CreateCustomer = z.infer<typeof createCustomerSchema>;

export interface Customer extends CreateCustomer {
    id: number
    ordemServico: ServiceOrder[]
    atualizadoEm: Date
    criadoEm: Date
}
