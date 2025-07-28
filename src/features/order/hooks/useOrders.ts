import type { OrderFilters } from "@/features/order/types/OrderFilters";
import { orderService } from "@/features/order/services/orderService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../types/Order";
import { showError } from "@/shared/utils/showMessage";

export function useOrders() {
   const [orders, setOrders] = useState<Order[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate();
   
   const loadServiceOrders = async (filters?: OrderFilters) => {
      setLoading(true)
      
      try {
         const _orders = await orderService.get(filters);

         setOrders(_orders);

      } catch (err: any) {
         showError(err.message);
      } finally {
         setLoading(false);
      }
   }

   const navigateToServiceOrder = (id: string) => {
      navigate(`/sistema/ordens/info/${id}`)
   }

   return {
      loadServiceOrders,
      navigateToServiceOrder,
      orders,
      loading
   }
}