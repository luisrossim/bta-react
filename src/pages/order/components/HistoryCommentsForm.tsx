import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { commentsHistorySchema, type CommentsHistoryDTO } from "@/models/order-history"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { InputFormItem } from "@/shared/components/InputFormItem";

interface HistoryCommentsFormProps {
   onSubmit: (data: CommentsHistoryDTO) => void
}

export function HistoryCommentsForm({ onSubmit }: HistoryCommentsFormProps) {
   const [openModal, setOpenModal] = useState(false);
   
   const form = useForm<CommentsHistoryDTO>({
      resolver: zodResolver(commentsHistorySchema)
   })

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         form.reset();
      }
   };

   const handleOnSubmit = (data: CommentsHistoryDTO) => {
      setOpenModal(false);
      onSubmit(data);
   }

   return (
      <FormProvider {...form}>
         <Dialog 
            open={openModal} 
            onOpenChange={handleOpenChange}
         >
            <DialogTrigger asChild>
               <Button variant={"secondary"} size={"lg"}>
                  <MessageSquare />Observações
               </Button>
            </DialogTrigger>

            <DialogContent>
               <form 
                  onSubmit={form.handleSubmit(handleOnSubmit)} 
                  className="space-y-6"
               >
                  <DialogHeader>
                     <DialogTitle>Observações da ordem</DialogTitle>
                  </DialogHeader>

                  <InputFormItem
                     label="Observações"
                     name="observacoes"
                  />

                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="outline">
                           Cancelar
                        </Button>
                     </DialogClose>
                     <Button type="submit">
                        Salvar
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </FormProvider>
   )
}