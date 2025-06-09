import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { associateFormSchema, type AssociatedUsers, type AssociateForm, type Stage } from "@/models/stage";
import { LoadingWrapper } from "@/components/loading";
import type { User } from "@/models/user";
import { stageService } from "@/services/stage-service";
import { userService } from "@/services/user-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link, Link2Off } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { toast } from "sonner";

export default function StageList() {
   const [stages, setStages] = useState<Stage[]>([])
   const [associated, setAssociated] = useState<AssociatedUsers[]>([])
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<boolean>(false);
   const [disableActions, setDisableActions] = useState<boolean>(false);
   const { handleSubmit, reset, control, formState: { errors } } = useForm<AssociateForm>({
      resolver: zodResolver(associateFormSchema)
   })


   useEffect(() => {
     fetchStagesAndAssociated()
   }, [])


   async function fetchStagesAndAssociated() {
      setLoading(true);

      try {
         const [_stages, _associated, _users] = await Promise.all([
            stageService.getAll(),
            stageService.getVinculados(),
            userService.getAll()
         ])

         setStages(_stages)
         setAssociated(_associated)
         setUsers(_users)

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false);
      }
   }


   async function associate(data: AssociateForm) {
      setDisableActions(true);
      const toastId = toast.loading("Vinculando usuário");

      try {
         await stageService.vincular(data);
         toast.success("Usuário vinculado com sucesso!", { id: toastId });
         reset();
         fetchStagesAndAssociated();

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }


   async function disassociate(stageId: number, userId: number) {
      setDisableActions(true);
      const toastId = toast.loading("Desvinculando usuário");
      const data = { stageId, userId }

      try {
         await stageService.desvincular(data);
         toast.success("Usuário desvinculado com sucesso!", { id: toastId });
         fetchStagesAndAssociated();

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }



   function handleAssociatedView(stages: Stage[], associated: AssociatedUsers[]): ReactNode {
      return (
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {stages.map(stage => {
               const vinculados = associated.find(a => a.stageId === stage.id);

               return (
                  <div key={stage.id} className="bg-slate-50 p-4">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="flex w-[24px] h-[24px] justify-center items-center rounded-full bg-blue-600">
                           <span className="text-white text-xs">{stage.id}</span>
                        </div>
                        <p className="text-blue-600 font-semibold">{stage.descricao}</p>
                     </div>

                     {vinculados && vinculados.users.length > 0 ? (
                        <ul className="text-sm">
                           {vinculados.users.map(user => (
                              <li key={user.id} className="flex items-center gap-3">
                                 <Button
                                    disabled={disableActions}
                                    onClick={() => disassociate(stage.id, user.id!)} 
                                    variant="link" 
                                    className="group p-0"
                                 >
                                    <span className="hidden group-hover:block">
                                       <Link2Off className="text-red-600" />
                                    </span>
                                    <span className="block group-hover:hidden">
                                       <Link className="text-blue-600" />
                                    </span>
                                 </Button>
                                 <span className="font-medium">{user.nome}</span> 
                              </li>
                           ))}
                        </ul>
                     ) : (
                        <p className="text-sm text-slate-500">Nenhum usuário vinculado</p>
                     )}
                  </div>
               );
            })}
         </div>
      );
   }

   

   if(loading) return <LoadingWrapper />

   return (
      <section className="grid grid-cols-1 gap-16 my-4">         
         <form onSubmit={handleSubmit(associate)}>
            <h2 className="font-semibold text-sm text-slate-500 mb-4">
               Vincular usuário
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-3">
               <FormFieldWrapper>
                  <Controller
                     name="stageId"
                     control={control}
                     render={({ field }) => (
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString() || ""}
                        >
                           <SelectTrigger className={`w-full ${errors.stageId && "border-red-500"}`}>
                              <SelectValue placeholder="Selecione uma etapa" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {stages.map((stage) => (
                                    <SelectItem key={stage.id} value={String(stage.id)}>
                                       {stage.descricao}
                                    </SelectItem>
                                 ))}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </FormFieldWrapper>
               
               <FormFieldWrapper>
                  <Controller
                     name="userId"
                     control={control}
                     render={({ field }) => (
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString() || ""}
                        >
                           <SelectTrigger className={`w-full ${errors.userId && "border-red-500"}`}>
                              <SelectValue placeholder="Selecione um usuário" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {users.map((user) => (
                                    <SelectItem key={user.id} value={String(user.id)}>
                                       {user.nome}
                                    </SelectItem>
                                 ))}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </FormFieldWrapper>

               <Button disabled={disableActions} size={"lg"} type="submit">
                  Vincular
               </Button>
            </div>
         </form>

         <section>
            <h2 className="font-semibold text-sm text-slate-500 mb-4">
               Vinculações
            </h2>
            {stages && associated && handleAssociatedView(stages, associated)}
         </section>
      </section>
   )
}