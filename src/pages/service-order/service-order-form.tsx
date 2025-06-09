import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceOrderFormSchema, type ServiceOrderForm } from "@/models/service-order";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { LoadingWrapper } from "@/components/loading";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/models/customer";
import type { Stage } from "@/models/stage";
import { customerService } from "@/services/customer-service";
import { stageService } from "@/services/stage-service";
import { ToastService } from "@/utils/services/toast-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { serviceOrderService } from "@/services/service-order-service";
import { Label } from "@/components/ui/label";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import { Check } from "lucide-react";
import { Breadcrumb, type PreviousUrl } from "@/components/breadcrumb";

export default function ServiceOrderFormPage() {
   const [customers, setCustomers] = useState<Customer[]>([])
   const [stages, setStages] = useState<Stage[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [disableActions, setDisableActions] = useState<boolean>(false)
   const navigate = useNavigate()

   const { handleSubmit, control, formState: { errors } } = useForm<ServiceOrderForm>({
      resolver: zodResolver(serviceOrderFormSchema)
   })


   useEffect(() => {
      loadCustomersAndStages()
   }, [])


   const loadCustomersAndStages = async () => {
      setLoading(true)
      
      try {
         const [_customers, _stages] = await Promise.all([
            customerService.getAll(),
            stageService.getAll()
         ])

         setCustomers(_customers);
         setStages(_stages);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false);
      }
   }


   const save = async (data: ServiceOrderForm) => {
      setDisableActions(true);
      const toastId = toast.loading("Criando ordem de serviço");
      
      try {
         await serviceOrderService.create(data);
         toast.success("Ordem de serviço criada com sucesso", { id: toastId });
         navigate("/sistema/ordens");

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }


   const previous: PreviousUrl[] = [
      {
         label: 'Ordens de serviço',
         redirectTo: '/sistema/ordens'
      }
   ]


   if(loading) return <LoadingWrapper />

   return (
      <div>
         <Breadcrumb current="Cadastrar" previous={previous} />
         <PageTitle title="Cadastrar nova ordem" />
         <PageSubtitle subtitle="Selecione o cliente e a etapa desejada." />

         <form onSubmit={handleSubmit(save)} className="grid grid-cols-1 lg:grid-cols-3 items-end gap-6 my-10">
            <FormFieldWrapper>
               <Controller
                  name="clienteId"
                  control={control}
                  render={({ field }) => (
                     <>
                        <Label>Cliente</Label>
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString() || ""}
                        >
                           <SelectTrigger className={`w-full ${errors.clienteId && "border-red-500"}`}>
                              <SelectValue placeholder="Selecione um cliente" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {customers && customers.map((customer) => (
                                    <SelectItem key={customer.id} value={String(customer.id)}>
                                       {customer.nome}
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
                  name="etapaId"
                  control={control}
                  render={({ field }) => (
                     <>
                        <Label>Etapa</Label>
                        <Select
                           onValueChange={field.onChange}
                           value={field.value?.toString() || ""}
                        >
                           <SelectTrigger className={`w-full ${errors.etapaId && "border-red-500"}`}>
                              <SelectValue placeholder="Selecione uma etapa" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {stages && stages.map((stage) => (
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

            {/* {selectedStage && selectedStage == 1 && (
               <div className="flex flex-col gap-6 mt-6">
                  <FormFieldWrapper>
                     <Controller
                        name="hasAutomacao"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                           <div className="flex items-center gap-3">
                              <Switch
                                 id="hasAuto"
                                 checked={!!field.value}
                                 onCheckedChange={field.onChange}
                              />
                              <Label htmlFor="hasAuto">Automação</Label>
                           </div>
                        )}
                     />
                  </FormFieldWrapper>

                  <FormFieldWrapper>
                     <Controller
                        name="hasProjetoPlantio"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                           <div className="flex items-center gap-3">
                              <Switch
                                 id="hasProjeto"
                                 checked={!!field.value}
                                 onCheckedChange={field.onChange}
                              />
                              <Label htmlFor="hasProjeto">Projeto de Plantio</Label>
                           </div>
                        )}
                     />
                  </FormFieldWrapper>

                  <FormFieldWrapper>
                     <Controller
                        name="hasOrcamentoBanco"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                           <div className="flex items-center gap-3">
                              <Switch
                                 id="hasOrcamento"
                                 checked={!!field.value}
                                 onCheckedChange={field.onChange}
                              />
                              <Label htmlFor="hasOrcamento">Orçamento em banco</Label>
                           </div>
                        )}
                     />
                  </FormFieldWrapper>

                  <FormFieldWrapper>
                     <Label htmlFor="quantidadeSetores">Quantidade de setores</Label>
                     
                     <Input
                        id="quantidadeSetores"
                        type="number"
                        className={`${errors.quantidadeSetores && "border-red-500"}`}
                        {...register("quantidadeSetores")}
                     />
                  </FormFieldWrapper>
               </div>
            )}
            
            {selectedStage && selectedStage == 10 && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <FormFieldWrapper>
                     <Label htmlFor="problem">Problema</Label>
                     
                     <Input
                        id="problem"
                        className={`${errors.problema && "border-red-500"}`}
                        {...register("problema")}
                     />
                  </FormFieldWrapper>

                  <FormFieldWrapper>
                     <Controller
                        name="tipoEnergiaId"
                        control={control}
                        defaultValue={1}
                        render={({ field }) => (
                           <>
                              <Label>Tipo de energia</Label>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value?.toString() || ""}
                              >
                                 <SelectTrigger className={`w-full ${errors.tipoEnergiaId && "border-red-500"}`}>
                                    <SelectValue placeholder="Tipo de energia" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       {tipoEnergia && tipoEnergia.map((item) => (
                                          <SelectItem key={item.id} value={String(item.id)}>
                                             {item.descricao}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           </>
                        )}
                     />
                  </FormFieldWrapper>
               </div>
            )} */}

            <Button size={"lg"} disabled={disableActions} type="submit">
               <Check /> Cadastrar   
            </Button>
         </form>
      </div>
   )
}