import z from "zod";
import type { Customer } from "../features/customer/types/Customer";
import type { OrderHistory } from "./order-history";
import type { Attachment } from "@/models/attachment";

export const createOrderSchema = z.object({
  clienteId: z.number().positive(),
  etapaId: z.number().positive()
})

export const measurementSchema = z.object({
  hasAutomacao: z.boolean(),
  hasOrcamentoBanco: z.boolean(),
  hasProjetoPlantio: z.boolean(),
  quantidadeSetores: z.coerce.number()
})

export const assistanceSchema = z.object({
  problema: z.string(),
  tipoEnergiaId: z.coerce.number().optional().nullable(),
  motobombaId: z.coerce.number().optional().nullable(),
  polegadasValvulasRegistro: z.coerce.number().optional().nullable(),
  diametroAdutoraMestre: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable()
})

export type CreateOrder = z.infer<typeof createOrderSchema>
export type Measurement = z.infer<typeof measurementSchema>
export type Assistance = z.infer<typeof assistanceSchema>

export type Order = Omit<CreateOrder, "etapaId"> &
  Measurement &
  Assistance & {
    id: string;
    cliente: Customer,
    anexos?: Attachment[],
    historicoOs: OrderHistory[],
    motobomba?: any,
    tipoEnergia?: any
    criadoEm: Date;
  };