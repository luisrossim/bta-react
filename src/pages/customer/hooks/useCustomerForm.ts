import type { Customer, CreateCustomer } from "@/models/customer";
import { customerService } from "@/services/customer-service";
import { ToastService } from "@/utils/services/toast-service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCustomerForm() {
   const navigate = useNavigate();
   
   const fetchCustomerById = async (id: string): Promise<Customer | undefined> => {
      try {
         const customer: Customer = await customerService.getById(id);
         return customer;

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
         navigate("/sistema/clientes")
      }
   }

   const saveCustomer = async (id: number | null, data: CreateCustomer) => {
      const toastId = toast.loading("Salvando cliente");
      
      try {
         if(id)
            await customerService.update(id, data);
         else 
            await customerService.create(data);
         
         toast.success("Cliente salvo com sucesso", { id: toastId });
         navigate(-1);

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      }
   }

   return {
      fetchCustomerById,
      saveCustomer
   }
}