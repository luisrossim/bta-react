import { orderFiltersSchema, type OrderFilters } from "@/models/filters"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useEffect, useMemo, useState } from "react";
import type { Stage } from "@/models/stage";
import type { User } from "@/models/user";
import { stageService } from "@/services/stage-service";
import { userService } from "@/services/user-service";
import { SelectFormItem } from "@/shared/components/SelectFormItem";

interface OrderFilterProps {
   onSubmit: (data: OrderFilters) => void;
}

export function OrderFilter({ onSubmit }: OrderFilterProps) {
   const [stages, setStages] = useState<Stage[]>([]);
   const [users, setUsers] = useState<User[]>([])
   const form = useForm<OrderFilters>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
         stageId: -1,
         userId: -1,
         status: "todos"
      }
   })

   const watchedValues = useWatch({ control: form.control });

   async function fetchStagesAndAssociated() {
      try {
         const [_stages, _users] = await Promise.all([
            stageService.getAll(),
            userService.getAll()
         ])

         setStages(_stages)
         setUsers(_users)

      } catch (err: any) {}
   }

   const defaultOption = { value: -1, label: "Todos" };

   const stageOptions = useMemo(
      () =>
         [defaultOption].concat(
            stages.map((stage) => ({
               value: stage.id,
               label: stage.descricao,
            }))
         ),
      [stages]
   );

   const userOptions = useMemo(
      () =>
         [defaultOption].concat(
            users.map((user) => ({
               value: user.id,
               label: user.nome,
            }))
         ),
      [users]
   );

   const situationOptions = [
      { value: "todos", label: "Todos" },
      { value: "andamento", label: "Em andamento" },
      { value: "concluida", label: "Concluída" },
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