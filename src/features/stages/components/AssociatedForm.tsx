import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import {
   associateFormSchema,
   type AssociateForm,
} from '@/features/stages/types/Stage';
import { SelectFormItem } from '@/shared/components/SelectFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface AssociatedFormProps {
   onAssociate: (data: AssociateForm) => void;
   stageOptions: { value: number; label: string }[];
   userOptions: { value: number; label: string }[];
   disableActions: boolean;
}

export function AssociatedForm({
   onAssociate,
   stageOptions,
   userOptions,
   disableActions,
}: AssociatedFormProps) {
   const [openModal, setOpenModal] = useState(false);

   const form = useForm<AssociateForm>({
      resolver: zodResolver(associateFormSchema),
   });

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         form.reset();
      }
   };

   const onSubmit = (data: AssociateForm) => {
      setOpenModal(false);
      onAssociate(data);
   };

   return (
      <FormProvider {...form}>
         <Dialog open={openModal} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
               <Button>
                  <Link />
                  Vincular
               </Button>
            </DialogTrigger>

            <DialogContent>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
               >
                  <DialogHeader>
                     <DialogTitle>Vincular usuário</DialogTitle>
                     <DialogDescription>
                        Essa ação facilitará a atribuição do mesmo no
                        gerenciamento de ordens de serviço.
                     </DialogDescription>
                  </DialogHeader>

                  <SelectFormItem
                     label='Etapa'
                     name='stageId'
                     options={stageOptions}
                  />

                  <SelectFormItem
                     label='Usuário'
                     name='userId'
                     options={userOptions}
                  />

                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                     </DialogClose>
                     <Button disabled={disableActions} type='submit'>
                        Vincular
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </FormProvider>
   );
}
