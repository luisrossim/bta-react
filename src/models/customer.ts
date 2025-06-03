import { z } from "zod";

interface Customer {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    endereco: object;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}

const createCustomerSchema = z.object({
    nome: z.string(),
    cpf: z.string(),
    telefone: z.string()
})

type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;


export { 
    type Customer,
    type CreateCustomerSchema,
    createCustomerSchema
}