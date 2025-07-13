import { orderFiltersSchema, type OrderFilters } from "@/models/filters"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import { useEffect, useMemo, useState } from "react";
import type { Stage } from "@/models/stage";
import type { User } from "@/models/user";
import { stageService } from "@/services/stage-service";
import { userService } from "@/services/user-service";
import { ToastService } from "@/utils/services/toast-service";
import { LoadingWrapper } from "../../../components/loading";
import { Filter } from "lucide-react";
import { SelectFormItem } from "@/shared/components/SelectFormItem";

interface ServiceOrderFilterProps {
   onSubmit: (data: OrderFilters) => void;
}

export function ServiceOrderFilter({ onSubmit }: ServiceOrderFilterProps) {
   const [stages, setStages] = useState<Stage[]>([]);
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<boolean>(false);
   const form = useForm<OrderFilters>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
         stageId: -1,
         userId: -1,
         status: "todos"
      }
   })


   useEffect(() => {
      fetchStagesAndAssociated()
   }, []);


   async function fetchStagesAndAssociated() {
      setLoading(true);

      try {
         const [_stages, _users] = await Promise.all([
            stageService.getAll(),
            userService.getAll()
         ])

         setStages(_stages)
         setUsers(_users)

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false);
      }
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


   if(loading) return <LoadingWrapper />

   return (
      <FormProvider {...form}>
         <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-end my-4"
         >
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

            <Button type="submit" variant="light">
               <Filter /> Filtrar
            </Button>
         </form>
      </FormProvider>
   )
}