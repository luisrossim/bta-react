import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useUploadOrderFile } from "../hooks/useUploadOrderFile"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

type UploadFormValues = {
  files: FileList
}

export function UploadFile() {
   const { upload } = useUploadOrderFile()
   const [openModal, setOpenModal] = useState(false);
   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<UploadFormValues>()

   const onSubmit = (data: UploadFormValues) => {
      if (data.files && data.files.length > 0) {
         upload(data.files)
      }
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpenModal(isOpen);

      if (isOpen) {
         reset();
      }
   };

   return (
      <Dialog 
         open={openModal} 
         onOpenChange={handleOpenChange}
      >
         <DialogTrigger asChild>
            <Button size={"sm"} variant={"outline"} className="mt-1"><Upload /> Anexar arquivo</Button>
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
                  name="files"
                  control={control}
                  rules={{
                     required: "Selecione pelo menos um arquivo.",
                  }}
                  render={({ field: { onChange, ref } }) => (
                     <div className="flex flex-col gap-2 py-4">
                        <Input 
                           id="file-upload" 
                           type="file" 
                           accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                           ref={ref}
                           onChange={(e) => onChange(e.target.files)}
                           className="file-input cursor-pointer"
                        />
                        {errors.files && (
                           <span className="text-sm text-red-500">{errors.files.message}</span>
                        )}
                     </div>
                  )}
               />

               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">
                        Cancelar
                     </Button>
                  </DialogClose>
                  <Button type="submit">Enviar arquivos</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
  )
}
