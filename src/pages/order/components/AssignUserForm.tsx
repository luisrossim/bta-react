import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { createAtribuicaoSchema, type CreateAtribuicao } from "@/models/service-order-history"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoundCheck } from "lucide-react"
import { useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SelectFormItem } from "@/shared/components/SelectFormItem";
import type { StageUser } from "@/models/stage";

interface AssignUserFormProps {
   stageUsers: StageUser[]
   atribuir: (data: CreateAtribuicao) => void
}

export function AssignUserForm({ stageUsers, atribuir }: AssignUserFormProps) {
   const [openModal, setOpenModal] = useState(false);
   
   const form = useForm<CreateAtribuicao>({
      resolver: zodResolver(createAtribuicaoSchema)
   })

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         form.reset();
      }
   };

   const onSubmit = (data: CreateAtribuicao) => {
      setOpenModal(false);
      atribuir(data);
   }

   const stageUsersOptions = useMemo(
      () =>
         stageUsers.map((option) => ({
            value: option.usuario.id,
            label: option.usuario.nome
         })),
      [stageUsers]
   );

   return (
      <FormProvider {...form}>
         <Dialog 
            open={openModal} 
            onOpenChange={handleOpenChange}
         >
            <DialogTrigger asChild>
               <Button variant={"light"} size={"lg"}>
                  <UserRoundCheck />Atribuir
               </Button>
            </DialogTrigger>

            <DialogContent>
               <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="space-y-6"
               >
                  <DialogHeader>
                     <DialogTitle>Atribuir usuário</DialogTitle>
                     <DialogDescription>
                        O usuário atribuído poderá realizar ações nessa etapa
                     </DialogDescription>
                  </DialogHeader>

                  <SelectFormItem 
                     label="Usuário"
                     name="userId"
                     options={stageUsersOptions}
                     placeholder="Selecione um usuário"
                  />

                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="outline">
                           Cancelar
                        </Button>
                     </DialogClose>
                     <Button type="submit">
                        Confirmar
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </FormProvider>
   )
}