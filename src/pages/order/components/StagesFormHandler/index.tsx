import type { Assistance, Measurement, Order } from "@/models/order"
import { MeasurementForm } from "./components/MeasurementForm";
import { AssistanceForm } from "./components/AssistanceForm";
import type { ReactNode } from "react";

interface StagesFormHandlerProps {
   order: Order;
   stage: string;
   onSubmitMeasurement: (values: Measurement) => void
   onSubmitAssistance: (values: Assistance) => void
}

export function StagesFormHandler({ 
   order,
   stage,
   onSubmitMeasurement, 
   onSubmitAssistance 
}: StagesFormHandlerProps) {
   const stageComponents: Record<string, ReactNode> = {
      "Medição": <MeasurementForm order={order} onSubmit={onSubmitMeasurement} />,
      "Assistência": <AssistanceForm order={order} onSubmit={onSubmitAssistance} />,
   }

   return stageComponents[stage] || null;
}