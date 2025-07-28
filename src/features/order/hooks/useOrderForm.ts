import type { Customer } from "@/features/customer/types/Customer"
import type { Stage } from "@/features/stages/types/Stage"
import { customerService } from "@/features/customer/services/customerService"
import { orderService } from "@/features/order/services/orderService"
import { stageService } from "@/features/stages/services/stageService"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { CreateOrder } from "../types/Order"

export function useOrderForm() {
   const [customers, setCustomers] = useState<Customer[]>([])
   const [stages, setStages] = useState<Stage[]>([])
   const [disableActions, setDisableActions] = useState<boolean>(false)
   const navigate = useNavigate()

   const loadCustomersAndStages = async () => {      
      try {
         const [_customers, _stages] = await Promise.all([
            customerService.get(),
            stageService.get()
         ])

         setCustomers(_customers);
         setStages(_stages);

      } catch (err: any) {}
   }


   const save = async (data: CreateOrder) => {
      setDisableActions(true);
      const toastId = toast.loading("Criando ordem de serviço");
      
      try {
         const order = await orderService.create(data);
         toast.success("Ordem de serviço criada com sucesso", { id: toastId });
         navigate(`/sistema/ordens/info/${order.id}`)

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   const customersOptions = useMemo(
      () =>
         Array.isArray(customers)
            ? customers.map((customer) => ({
               value: customer.id,
               label: customer.nome,
            }))
            : [],
      [customers]
   );

   const stageOptions = useMemo(
      () =>
         stages.map((stage) => ({
            value: stage.id,
            label: stage.descricao,
         })),
      [stages]
   );

   useEffect(() => {
      loadCustomersAndStages()
   }, [])

   return {
      save,  
      customersOptions,
      stageOptions,
      disableActions
   }
}