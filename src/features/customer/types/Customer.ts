import type { Order } from "@/features/order/types/Order";
import { createAddressSchema } from "@/features/user/types/address";
import { z } from "zod";

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
