import z from "zod"

export const roleSchema = z.object({
   id: z.number(),
   descricao: z.string().optional()
})

export type Role = z.infer<typeof roleSchema>

export type Roles = 'Admin' | 'Técnico' | 'Assistente'