import type { Customer } from "@/models/customer"
import type { CreateOrder } from "@/models/order"
import type { Stage } from "@/models/stage"
import { customerService } from "@/services/customer-service"
import { orderService } from "@/services/order-service"
import { stageService } from "@/services/stage-service"
import { ToastService } from "@/utils/services/toast-service"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useOrderForm() {
   const [customers, setCustomers] = useState<Customer[]>([])
   const [stages, setStages] = useState<Stage[]>([])
   const [disableActions, setDisableActions] = useState<boolean>(false)
   const navigate = useNavigate()

   const loadCustomersAndStages = async () => {      
      try {
         const [_customers, _stages] = await Promise.all([
            customerService.getAll(),
            stageService.getAll()
         ])

         setCustomers(_customers);
         setStages(_stages);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
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
         customers.map((customer) => ({
            value: customer.id,
            label: customer.nome,
         })),
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