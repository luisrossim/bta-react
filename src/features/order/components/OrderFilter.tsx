import { orderFiltersSchema, type OrderFilters } from "@/features/order/types/OrderFilters"
import { stageService } from "@/features/stages/services/stageService";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { SelectFormItem } from "@/shared/components/SelectFormItem";
import { userService } from "@/features/user/services/userService";
import { FormProvider, useForm, useWatch } from "react-hook-form"
import type { Stage } from "@/features/stages/types/Stage";
import { showError } from "@/shared/utils/showMessage";
import type { User } from "@/features/user/types/User";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react";

interface OrderFilterProps {
   onSubmit: (data: OrderFilters) => void;
}

export function OrderFilter({ 
   onSubmit 
}: OrderFilterProps) {
   const [stages, setStages] = useState<Stage[]>([]);
   const [users, setUsers] = useState<User[]>([]);
   const { isAdmin, userLogged } = useAuthContext();

   const form = useForm<OrderFilters>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
         stageId: -1,
         userId: isAdmin ? -1 : userLogged?.id,
         status: "todas"
      }
   })

   const watchedValues = useWatch({ control: form.control });

   async function fetchStagesAndAssociated() {
      try {
         const _stages = await stageService.get();

         let _users: User[] = [];

         if(isAdmin) {
            _users = await userService.get();
         }

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

            { isAdmin && (
               <SelectFormItem 
                  name="userId"
                  label="Usuário"
                  options={userOptions}
               />
            )}

            <SelectFormItem 
               name="status"
               label="Situação"
               options={situationOptions}
            />
         </form>
      </FormProvider>
   )
}