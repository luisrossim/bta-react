import z from "zod";
import type { Customer } from "./customer";
import type { ServiceOrderHistory } from "./service-order-history";

export const createOrderSchema = z.object({
  clienteId: z.number().positive(),
  etapaId: z.number().positive()
})

export const measurementFormSchema = z.object({
  hasAutomacao: z.boolean(),
  hasOrcamentoBanco: z.boolean(),
  hasProjetoPlantio: z.boolean(),
  quantidadeSetores: z.coerce.number()
})

export const assistanceFormSchema = z.object({
  problema: z.string(),
  tipoEnergiaId: z.coerce.number().optional().nullable(),
  motobombaId: z.coerce.number().optional().nullable(),
  polegadasValvulasRegistro: z.coerce.number().optional().nullable(),
  diametroAdutoraMestre: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable()
})

export type CreateOrder = z.infer<typeof createOrderSchema>
export type MeasurementForm = z.infer<typeof measurementFormSchema>
export type AssistanceForm = z.infer<typeof assistanceFormSchema>

export type ServiceOrder = Omit<CreateOrder, "etapaId"> &
  MeasurementForm &
  AssistanceForm & {
    id: number;
    cliente: Customer,
    anexos?: any[],
    historicoOs: ServiceOrderHistory[],
    motobomba?: any,
    tipoEnergia?: any
    criadoEm: Date;
  };