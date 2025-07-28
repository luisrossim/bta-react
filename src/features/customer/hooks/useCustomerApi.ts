import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateCustomer, Customer } from "@/features/customer/types/Customer";
import { customerService } from "@/features/customer/services/customerService";

function useGetCustomers() {
   return useQuery<Customer[], Error>({
      queryKey: ["customers"],
      queryFn: () => customerService.get(),
   });
}

function useGetCustomer(id?: string) {
   return useQuery<Customer, Error>({
      queryKey: ["get-customer-id", id],
      queryFn: () => {
         if (!id) throw new Error("ID is required");
         return customerService.getById(id);
      },
      enabled: Boolean(id)
   });
}

function useCreateCustomer() {
   return useMutation<Customer, Error, CreateCustomer>({
      mutationFn: (data: CreateCustomer) => customerService.create(data)
   });
}

export {
   useGetCustomers,
   useGetCustomer,
   useCreateCustomer
};
