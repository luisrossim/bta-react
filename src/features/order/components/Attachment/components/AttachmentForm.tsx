import { useForm, Controller } from "react-hook-form"
import { showWarning } from "@/shared/utils/showMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"
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

type UploadFile = {
  file: FileList
}

interface AttachmentFormProps {
   onUpload: (file: FormData) => Promise<void>
   disableActions: boolean
}

export function AttachmentForm({ onUpload, disableActions }: AttachmentFormProps) {
   const form = useForm<UploadFile>();
   const [openModal, setOpenModal] = useState(false);
   const maxSizeInBytes = 5 * 1024 * 1024;

   const onSubmit = async (values: UploadFile) => {
      const file = values.file?.[0]

      if(!file) {
         showWarning("Arquivo inválido ou desconhecido.");
         return;
      }

      if(file.size > maxSizeInBytes) {
         showWarning("O tamanho máximo permitido de arquivos é de 5MB");
         return;
      }

      const formData = new FormData();
      formData.append("file", file);
      
      onUpload(formData);
      setOpenModal(false);
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         form.reset();
      }
   }

   return (
      <Dialog open={openModal} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <button
               className="group flex flex-col gap-2 cursor-pointer items-center justify-center p-4 rounded-lg hover:bg-muted border border-dashed transition-colors"
            >
               <div className="flex items-center justify-center">
                  <Plus className="text-muted-foreground" />
               </div>
            </button>
         </DialogTrigger>

         <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
               <DialogHeader>
                  <DialogTitle>Anexar arquivo</DialogTitle>
                  <DialogDescription>
                     Salve imagens e demais documentos referente a essa ordem de serviço
                  </DialogDescription>
               </DialogHeader>

               <Controller
                  name="file"
                  control={form.control}
                  rules={{ required: "Selecione um arquivo." }}
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
