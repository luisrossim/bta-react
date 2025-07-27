import { OrderListTable } from "@/features/order/components/OrderListTable";
import { OrderFilter } from "@/features/order/components/OrderFilter";
import { useOrders } from "../hooks/useOrders";
import { useEffect } from "react";
import type { OrderFilters } from "@/features/order/types/OrderFilters";

export default function OrderList() {
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
      <div className="grid grid-cols-1 gap-8">
         <OrderFilter 
            onSubmit={onFilterSubmit} 
         />

         <OrderListTable
            orders={orders} 
            loading={loading}
            navigate={navigateToServiceOrder}
         />
      </div>
   )
}