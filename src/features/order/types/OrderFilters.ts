import z from "zod";

export const orderFiltersSchema = z.object({
   stageId: z.number().optional(),
   userId: z.number().optional(),
   status: z.enum(["todas", "andamento", "concluida", "cancelada"]).optional()
})

export type OrderFilters = z.infer<typeof orderFiltersSchema>