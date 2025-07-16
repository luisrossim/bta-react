import { serviceOrderService } from "@/services/order-service";
import { useState } from "react";
import { toast } from "sonner";

export function useUploadOrderFile(){
   const [disableActions, setDisableActions] = useState<boolean>(false); 

   const uploadFile = async (orderId: string, file: any) => {
      setDisableActions(true);

      const toastId = toast.loading("Salvando arquivo...");

      try {
         await serviceOrderService.uploadAttachment(orderId, file);
         toast.success("Arquivo salvo com sucesso!", { id: toastId });

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   return {
      uploadFile,
      disableActions
   }
}