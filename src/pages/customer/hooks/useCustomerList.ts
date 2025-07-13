import type { Customer } from "@/models/customer";
import { customerService } from "@/services/customer-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState } from "react";

export function useCustomerList(){
   const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
   const [customers, setCustomers] = useState<Customer[]>([]);
   const [search, setSearch] = useState<string>('')

   const fetchCustomers = async () => {
      try {
         const _customers: Customer[] = await customerService.getAll();
         setCustomers(_customers);
         setAllCustomers(_customers);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }


   useEffect(() => {
      fetchCustomers();
   }, [])

   useEffect(() => {
      const filtered = allCustomers.filter((customer) => {
         const term = search.toLowerCase();

         return (
            customer.nome.toLowerCase().startsWith(term) ||
            customer.cpf.toLowerCase().startsWith(term)
         );
      });

      setCustomers(filtered);
      
   }, [search, allCustomers]);


   return {
      customers,
      allCustomers,
      search,
      setSearch
   }
}