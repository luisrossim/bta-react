import { serviceOrderFormSchema, type ServiceOrderForm } from "@/models/service-order";
import { LoadingWrapper } from "@/components/loading";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/models/customer";
import type { Stage } from "@/models/stage";
import { customerService } from "@/services/customer-service";
import { stageService } from "@/services/stage-service";
import { ToastService } from "@/utils/services/toast-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { serviceOrderService } from "@/services/order-service";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import { Check } from "lucide-react";
import { SelectFormItem } from "@/shared/components/SelectFormItem";

export default function ServiceOrderFormPage() {
   const [customers, setCustomers] = useState<Customer[]>([])
   const [stages, setStages] = useState<Stage[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [disableActions, setDisableActions] = useState<boolean>(false)
   const navigate = useNavigate()

   const form = useForm<ServiceOrderForm>({
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


   if(loading) return <LoadingWrapper />

   return (
      <div>
         <PageTitle title="Nova ordem de serviço" />
         <PageSubtitle subtitle="Selecione o cliente e a etapa desejada para iniciar um fluxo de ordem de serviço." />

         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(save)} className="grid grid-cols-1 lg:grid-cols-3 items-end gap-6 my-10">
               <SelectFormItem 
                  label="Cliente"
                  name="clienteId"
                  options={customersOptions}
                  placeholder="Selecione um cliente"
               />

               <SelectFormItem 
                  label="Etapa"
                  name="etapaId"
                  options={stageOptions}
                  placeholder="Selecione uma etapa"
               />
               
               <Button size={"lg"} disabled={disableActions} type="submit">
                  <Check /> Cadastrar   
               </Button>
            </form>
         </FormProvider>
      </div>
   )
}