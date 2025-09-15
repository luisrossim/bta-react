import z from 'zod';

export const orderFiltersSchema = z.object({
    stageId: z.number().optional(),
    userId: z.number().optional(),
    status: z.enum(['andamento', 'concluida', 'cancelada']).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

export type OrderFilters = z.infer<typeof orderFiltersSchema>;
