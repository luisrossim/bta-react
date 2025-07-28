import { toast } from "sonner"

function showError(message: string) {
   return toast.error(message);
}

function showSuccess(message: string) {
   return toast.success(message);
}

function showInfo(message: string) {
   return toast.info(message);
}

function showWarning(message: string) {
   return toast.warning(message);
}

function showLoading(message: string) {
   return toast.loading(message, { });
}

export {
   showSuccess,
   showError,
   showInfo,
   showLoading,
   showWarning
}