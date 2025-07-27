import type { OrderFilters } from "@/features/order/types/OrderFilters";
import type { Order } from "@/models/order";
import { orderService } from "@/features/order/services/orderService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
         //ToastService.showError(err?.response?.data?.message || err?.message)
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