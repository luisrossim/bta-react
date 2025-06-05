import z from "zod";

export const createAddressSchema = z.object({
   cidade: z.string().nonempty(),
   estado: z.string().nonempty(),
   hectare: z.coerce.number().optional().nullable(),
   coordenadasGeograficas: z.string().optional().nullable(),
   kmLojaCliente: z.coerce.number().optional().nullable(),
   referencia: z.string().optional().nullable()
})