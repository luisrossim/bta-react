import { orderService } from "@/services/order-service";
import { useState } from "react";
import { toast } from "sonner";

export function useUploadOrderFile(){
   const [disableActions, setDisableActions] = useState<boolean>(false); 

   const uploadFile = async (orderId: string, file: any) => {
      setDisableActions(true);

      const toastId = toast.loading("Salvando arquivo...");

      try {
         await orderService.uploadAttachment(orderId, file);
         toast.success("Arquivo salvo com sucesso!", { id: toastId });

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   const viewAttachment = async (attachmentId: string) => {
      setDisableActions(true);

      const toastId = toast.loading("Buscando arquivo...");

      try {
         const attachment = await orderService.viewAttachment(attachmentId);
         toast.success("Arquivo encontrado com sucesso!", { id: toastId });
         return attachment;

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   return {
      uploadFile,
      viewAttachment,
      disableActions
   }
}