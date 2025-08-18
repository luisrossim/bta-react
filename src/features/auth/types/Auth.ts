import { z } from "zod";

export const authRequestSchema = z.object({
   login: z.string({ message: "E-mail inválido" }).email("E-mail inválido"),
   password: z.string({ message: "Senha inválida" }).min(6, "A senha deve possuir pelo menos 6 caracteres")
})

export type AuthRequest = z.infer<typeof authRequestSchema>

export type AuthUser = {
   id: number
   login: string
   role: string
}
