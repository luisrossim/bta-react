import z from "zod"
import type { User } from "./user"

const stageSchema = z.object({
   id: z.number(),
   descricao: z.string()
})

type Stage = z.infer<typeof stageSchema> & {
   etapaUsuario: StageUser[]
}

interface StageUser {
   etapaId: number
   userId: number
   usuario: User
}

const associateFormSchema = z.object({
   stageId: z.number({ message: "Etapa inválida"}),
   userId: z.number({ message: "Usuário inválido" })
})

type AssociateForm = z.infer<typeof associateFormSchema>

interface AssociatedUsers {
   stageId: number
   users: Partial<User>[]
}

export {
   stageSchema,
   type Stage,
   type StageUser,
   associateFormSchema,
   type AssociateForm,
   type AssociatedUsers
}