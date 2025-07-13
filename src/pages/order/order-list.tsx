import { ServiceOrderListTable } from "@/pages/order/components/order-list-table";
import { ServiceOrderFilter } from "@/pages/order/components/order-filter";
import { useOrders } from "./hooks/use-orders";
import { useEffect } from "react";
import type { OrderFilters } from "@/models/filters";

export default function ServiceOrderList() {
   const { 
      orders, 
      loading, 
      loadServiceOrders, 
      navigateToServiceOrder 
   } = useOrders();

   
   useEffect(() => {
      loadServiceOrders()
   }, [])


   const onFilterSubmit = (filters: OrderFilters) => {
      const cleanedFilters = Object.fromEntries(
         Object.entries(filters).filter(([_, value]) => value !== -1)
      );

      loadServiceOrders(cleanedFilters as OrderFilters);
   };

   return (
      <>
         <ServiceOrderFilter 
            onSubmit={onFilterSubmit} 
         />
         <ServiceOrderListTable
            orders={orders} 
            loading={loading}
            navigate={navigateToServiceOrder}
         />
      </>
   )
}