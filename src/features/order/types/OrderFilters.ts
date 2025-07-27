import z from "zod";

export const orderFiltersSchema = z.object({
   stageId: z.number().optional(),
   userId: z.number().optional(),
   status: z.enum(["todos", "andamento", "concluida"]).optional()
})

export type OrderFilters = z.infer<typeof orderFiltersSchema>