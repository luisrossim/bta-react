import { LoadingWrapper } from "@/components/loading";
import { associateFormSchema, type AssociatedUsers, type AssociateForm, type Stage } from "@/models/stage";
import type { User } from "@/models/user";
import { stageService } from "@/services/stage-service";
import { userService } from "@/services/user-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState, type ReactNode } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { CheckCircle, Link } from "lucide-react";
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
         const [stages, associated, users] = await Promise.all([
            stageService.getAll(),
            stageService.getVinculados(),
            userService.getAll()
         ])

         setStages(stages)
         setAssociated(associated)
         setUsers(users)

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


   function handleAssociatedView(stages: Stage[], associated: AssociatedUsers[]): ReactNode {
      return (
         <div className="grid grid-cols-1 gap-4">
            {stages.map(stage => {
               const vinculados = associated.find(a => a.stageId === stage.id);

               return (
                  <div key={stage.id} className="border bg-slate-50 p-4">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="flex w-[28px] h-[28px] justify-center items-center p-1 rounded-full bg-blue-600">
                           <span className="text-white text-sm">{stage.id}</span>
                        </div>
                        <p className="text-blue-600 font-medium">{stage.descricao}</p>
                     </div>

                     {vinculados && vinculados.users.length > 0 ? (
                        <ul className="text-sm">
                           {vinculados.users.map(user => (
                              <li key={user.id} className="flex items-center gap-2">
                                 <span className="font-medium">{user.nome}</span> 
                                 <span className="text-slate-500">({user.role?.descricao})</span>
                              </li>
                           ))}
                        </ul>
                     ) : (
                        <p className="text-slate-500 text-sm">Nenhum usuário vinculado</p>
                     )}
                  </div>
               );
            })}
         </div>
      );
   }

   

   if(loading) return <LoadingWrapper />

   return (
      <section className="my-12">
         <div className="flex items-center text-slate-500 gap-2 mb-3">
            <Link size={14} />
            <h2 className="font-medium text-sm">Vincular usuário</h2>
         </div>
         
         <form onSubmit={handleSubmit(associate)} className="grid grid-cols-1 lg:grid-cols-3 items-center gap-2">
            <FormFieldWrapper>
               <Controller
                  name="stageId"
                  control={control}
                  render={({ field }) => (
                     <>
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString()}
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
                     </>
                  )}
               />
            </FormFieldWrapper>
            
            <FormFieldWrapper>
               <Controller
                  name="userId"
                  control={control}
                  render={({ field }) => (
                     <>
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString()}
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
                     </>
                  )}
               />
            </FormFieldWrapper>

            <Button disabled={disableActions} type="submit">Vincular</Button>
         </form>

         <section>
            <div className="flex items-center text-slate-500 gap-2 mt-14 mb-3">
               <CheckCircle size={14} />
               <h2 className="font-medium text-sm">Vinculações</h2>
            </div>

            {stages && associated && handleAssociatedView(stages, associated)}
         </section>
      </section>
   )
}