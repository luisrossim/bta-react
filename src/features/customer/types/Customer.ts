import type { Order } from "@/features/order/types/Order";
import { createAddressSchema } from "@/features/user/types/Address";
import { z } from "zod";

export const createCustomerSchema = z.object({
    nome: z.string().nonempty({ message: 'Nome é obrigatório.' }),
    telefone: z.string().nonempty({ message: 'Telefone é obrigatório.' }),
    cpf: z.string().length(11, { message: 'CPF inválido.' }),
    endereco: createAddressSchema
})

export type CreateCustomer = z.infer<typeof createCustomerSchema>;

export interface UpdateCustomer {
   id: number | string;
   data: Partial<CreateCustomer>;
}

export interface Customer extends CreateCustomer {
    id: number
    ordemServico: Order[]
    atualizadoEm: Date
    criadoEm: Date
}
