import z from "zod";

export const createAddressSchema = z.object({
   descricao: z.string().optional().nullable(),
   cidade: z.string().nonempty({ message: "Cidade é obrigatória." }),
   estado: z.string().nonempty({ message: "Estado é obrigatório." }),
   hectare: z.coerce.number().optional().nullable(),
   coordenadasGeograficas: z.string().optional().nullable(),
   kmLojaCliente: z.coerce.number().optional().nullable(),
   referencia: z.string().optional().nullable()
})