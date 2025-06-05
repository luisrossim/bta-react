import z from "zod"
import type { User } from "./user"

export const stageSchema = z.object({
   id: z.number(),
   descricao: z.string()
})

export const associateFormSchema = z.object({
   stageId: z.coerce.number().positive(),
   userId: z.coerce.number().positive()
})

export type Stage = z.infer<typeof stageSchema>
export type AssociateForm = z.infer<typeof associateFormSchema>

export interface AssociatedUsers {
   stageId: number
   users: Partial<User>[]
}