import z from "zod";
import type { Customer } from "@/features/customer/types/Customer";
import type { OrderHistory } from "@/features/order/types/OrderHistory";
import type { Attachment } from "./Attachment";

const createOrderSchema = z.object({
  clienteId: z.number().positive(),
  etapaId: z.number().positive()
})

const measurementSchema = z.object({
  hasAutomacao: z.boolean(),
  hasOrcamentoBanco: z.boolean(),
  hasProjetoPlantio: z.boolean(),
  quantidadeSetores: z.coerce.number()
})

const assistanceSchema = z.object({
  problema: z.string(),
  tipoEnergiaId: z.coerce.number().optional().nullable(),
  motobombaId: z.coerce.number().optional().nullable(),
  polegadasValvulasRegistro: z.coerce.number().optional().nullable(),
  diametroAdutoraMestre: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable()
})

type CreateOrder = z.infer<typeof createOrderSchema>
type Measurement = z.infer<typeof measurementSchema>
type Assistance = z.infer<typeof assistanceSchema>

type Order = Omit<CreateOrder, "etapaId"> &
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

export {
  type Order,
  type CreateOrder,
  type Measurement,
  type Assistance,
  createOrderSchema,
  measurementSchema,
  assistanceSchema
}