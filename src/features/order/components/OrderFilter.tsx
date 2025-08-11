import { orderFiltersSchema, type OrderFilters } from "@/features/order/types/OrderFilters"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useEffect, useMemo, useState } from "react";
import type { Stage } from "@/features/stages/types/Stage";
import type { User } from "@/features/user/types/User";
import { stageService } from "@/features/stages/services/stageService";
import { SelectFormItem } from "@/shared/components/SelectFormItem";
import { userService } from "@/features/user/services/userService";
import { showError } from "@/shared/utils/showMessage";

interface OrderFilterProps {
   onSubmit: (data: OrderFilters) => void;
}

export function OrderFilter({ 
   onSubmit 
}: OrderFilterProps) {
   const [stages, setStages] = useState<Stage[]>([]);
   const [users, setUsers] = useState<User[]>([])
   const form = useForm<OrderFilters>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
         stageId: -1,
         userId: -1,
         status: "todas"
      }
   })

   const watchedValues = useWatch({ control: form.control });

   async function fetchStagesAndAssociated() {
      try {
         const [_stages, _users] = await Promise.all([
            stageService.get(),
            userService.get()
         ])

         setStages(_stages)
         setUsers(_users)

      } catch (err: any) {
         showError("Erro ao buscar filtros")
      }
   }

   const stageOptions = useMemo(
      () =>
         [{ 
            value: -1, 
            label: "Todas" 
         }].concat(
            stages.map((stage) => ({
               value: stage.id,
               label: stage.descricao,
            }))
         ),
      [stages]
   );

   const userOptions = useMemo(
      () =>
         [{ 
            value: -1, 
            label: "Todos" 
         }].concat(
            users.map((user) => ({
               value: user.id,
               label: user.nome,
            }))
         ),
      [users]
   );

   const situationOptions = [
      { value: "todas", label: "Todas" },
      { value: "andamento", label: "Em andamento" },
      { value: "concluida", label: "Concluída" },
      { value: "cancelada", label: "Cancelada" },
   ];

   useEffect(() => {
      onSubmit(watchedValues);
   }, [watchedValues.stageId, watchedValues.userId, watchedValues.status]);

   useEffect(() => {
      fetchStagesAndAssociated()
   }, []);

   return (
      <FormProvider {...form}>
         <form className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-end my-4">
            <SelectFormItem 
               name="stageId"
               label="Etapa"
               options={stageOptions}
            />

            <SelectFormItem 
               name="userId"
               label="Usuário"
               options={userOptions}
            />

            <SelectFormItem 
               name="status"
               label="Situação"
               options={situationOptions}
            />
         </form>
      </FormProvider>
   )
}