import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ToastService } from "@/utils/services/toast-service"

type UploadFormValues = {
  image: FileList
}

interface UploadFileProps {
  orderId: string
  uploadFn: (orderId: string, file: any) => Promise<void>
  disableActions: boolean
}

export function UploadFile({ orderId, uploadFn, disableActions }: UploadFileProps) {
   const [openModal, setOpenModal] = useState(false);
   const maxSizeInBytes = 5 * 1024 * 1024;

   const { handleSubmit, control, reset } = useForm<UploadFormValues>();

   const onSubmit = async (data: UploadFormValues) => {
      const file = data.image?.[0]

      if(!file) {
         return ToastService.showError("Arquivo inválido ou desconhecido.")
      }

      if(file.size > maxSizeInBytes) {
         return ToastService.showError("O tamanho máximo permitido de arquivos é de 5MB")
      }

      const formData = new FormData();
      formData.append("image", file);
      
      uploadFn(orderId, formData);

      setOpenModal(false);
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen)
      if (isOpen) {
         reset()
      }
   }

   return (
      <Dialog open={openModal} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <div>
               <Button size="sm" variant="dark" className="my-1">
                  <Upload /> Anexar arquivo
               </Button>
            </div>
         </DialogTrigger>

         <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
               <DialogHeader>
                  <DialogTitle>Anexar arquivo</DialogTitle>
                  <DialogDescription>
                     Salve imagens e demais documentos referente a essa ordem de serviço
                  </DialogDescription>
               </DialogHeader>

               <Controller
                  name="image"
                  control={control}
                  rules={{ required: "Selecione pelo menos um arquivo." }}
                  render={({ field: { onChange, ref } }) => (
                     <div className="flex flex-col gap-2 py-4">
                        <Input
                           id="file-upload"
                           type="file"
                           accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                           ref={ref}
                           onChange={(e) => onChange(e.target.files)}
                           className="cursor-pointer"
                        />
                     </div>
                  )}
               />

               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancelar</Button>
                  </DialogClose>

                  <Button type="submit" disabled={disableActions}>
                     Anexar
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
