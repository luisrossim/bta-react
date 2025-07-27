import { z } from "zod";
import { createAddressSchema } from "../../../models/address";
import type { Order } from "../../../models/order";

export const createCustomerSchema = z.object({
    nome: z.string().nonempty(),
    telefone: z.string().nonempty(),
    cpf: z.string().length(11),
    endereco: createAddressSchema
})

export type CreateCustomer = z.infer<typeof createCustomerSchema>;

export interface Customer extends CreateCustomer {
    id: number
    ordemServico: Order[]
    atualizadoEm: Date
    criadoEm: Date
}
