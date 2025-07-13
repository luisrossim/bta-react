import z from "zod";

export const createAddressSchema = z.object({
   cidade: z.string().nonempty({ message: "Cidade inválida" }),
   estado: z.string().nonempty({ message: "Estado inválido" }),
   hectare: z.coerce.number().optional().nullable(),
   coordenadasGeograficas: z.string().optional().nullable(),
   kmLojaCliente: z.coerce.number().optional().nullable(),
   referencia: z.string().optional().nullable()
})