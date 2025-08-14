import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { SelectFormItem } from "@/shared/components/SelectFormItem";
import { useOrderForm } from "../hooks/useOrderForm";
import { useState } from "react";
import { createOrderSchema, type CreateOrder } from "../types/Order";
import { useCreateOrderMutation } from "../hooks/useOrderApi";

export default function OrderForm() {
   const [openModal, setOpenModal] = useState(false);

   const {
      customersOptions,
      stageOptions,
   } = useOrderForm();

   const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

   const form = useForm<CreateOrder>({
      resolver: zodResolver(createOrderSchema)
   })

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         form.reset();
      }
   };

   const onSubmit = async (data: CreateOrder) => {
      await createOrder(data);
      setOpenModal(false);
   }

   return (
      <FormProvider {...form}>
         <Dialog 
            open={openModal} 
            onOpenChange={handleOpenChange}
         >
            <DialogTrigger asChild>
               <Button><Plus />Nova Ordem</Button>
            </DialogTrigger>

            <DialogContent>
               <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="flex flex-col justify-between gap-8"
               >
                  <div className="space-y-6">
                     <DialogHeader>
                        <DialogTitle>Nova ordem de serviço</DialogTitle>
                     </DialogHeader>

                     <SelectFormItem 
                        label="Etapa"
                        name="etapaId"
                        options={stageOptions}
                     />

                     <SelectFormItem 
                        label="Cliente"
                        name="clienteId"
                        options={customersOptions}
                     />
                  </div>

                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="outline">
                           Cancelar
                        </Button>
                     </DialogClose>
                     <Button 
                        disabled={isPending} 
                        type="submit"
                     >
                        Cadastrar
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </FormProvider>
   )
}