import { customerService } from "@/features/customer/services/customerService"
import type { CustomerRaw } from "@/features/customer/types/Customer"
import { stageService } from "@/features/stages/services/stageService"
import type { Stage } from "@/features/stages/types/Stage"
import { showError } from "@/shared/utils/showMessage"
import { useEffect, useMemo, useState } from "react"

export function useOrderForm() {
   const [customers, setCustomers] = useState<CustomerRaw[]>([]);
   const [stages, setStages] = useState<Stage[]>([]);

   const loadCustomersAndStages = async () => {      
      try {
         const [_customers, _stages] = await Promise.all([
            customerService.getAll(),
            stageService.get()
         ])

         setCustomers(_customers);
         setStages(_stages);

      } catch (err: any) {
         showError(err);
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
      customersOptions,
      stageOptions,
   }
}