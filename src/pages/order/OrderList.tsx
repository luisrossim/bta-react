import { ServiceOrderListTable } from "@/pages/order/components/OrderListTable";
import { ServiceOrderFilter } from "@/pages/order/components/OrderFilter";
import { useOrders } from "./hooks/useOrders";
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