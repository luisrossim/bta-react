import type { OrderFilters } from "@/models/filters";
import type { ServiceOrder } from "@/models/service-order";
import { serviceOrderService } from "@/services/order-service";
import { ToastService } from "@/utils/services/toast-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useOrders() {
   const [orders, setOrders] = useState<ServiceOrder[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate();
   
   const loadServiceOrders = async (filters?: OrderFilters) => {
      setLoading(true)
      
      try {
         const _orders = filters 
            ? await serviceOrderService.getAllWithParams(filters)
            : await serviceOrderService.getAll()

         setOrders(_orders);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false);
      }
   }

   const navigateToServiceOrder = (id: number) => {
      navigate(`/sistema/ordens/info/${id}`)
   }

   return {
      loadServiceOrders,
      navigateToServiceOrder,
      orders,
      loading
   }
}