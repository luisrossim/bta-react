import type { Order } from "@/features/order/types/Order";
import { z } from "zod";

export const createCustomerSchema = z.object({
    nome: z.string().nonempty({ message: 'Nome é obrigatório.' }).min(2, { message: 'Nome muito curto.' }),
    telefone: z.string().nonempty({ message: 'Telefone é obrigatório.' }),
    cpf: z.string().length(11, { message: 'CPF inválido.' }),
    endereco: z.object({
        descricao: z.string().nonempty({ message: "Endereço é obrigatório." }),
        hectare: z.coerce.number().optional().nullable(),
        coordenadasGeograficas: z.string().optional().nullable(),
        kmLojaCliente: z.coerce.number().optional().nullable(),
        referencia: z.string().optional().nullable()
    })
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

export interface CustomerRaw {
    id: number;
    nome: string;
    cpf: string;
}
