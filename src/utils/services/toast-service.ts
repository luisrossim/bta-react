import { toast } from "sonner"

export class ToastService {
   static showError(message: string) {
      return toast.error(message);
   }

   static showSuccess(message: string) {
      return toast.success(message);
   }

   static showInfo(message: string) {
      return toast.info(message);
   }

   static showWarning(message: string) {
      return toast.warning(message);
   }

   static showLoading(message: string) {
      return toast.loading(message);
   }
}
