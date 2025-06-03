import { z } from "zod";

const authRequestSchema = z.object({
   login: z.string().email("E-mail inválido"),
   password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres")
})

type AuthRequest = z.infer<typeof authRequestSchema>

type AuthUser = {
   login: string
   role: string
}

export {
   authRequestSchema,
   type AuthRequest,
   type AuthUser
}