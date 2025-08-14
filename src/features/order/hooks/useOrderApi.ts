import type { PaginatedResponse } from "@/shared/types/PaginatedResponse";
import { orderService } from "@/features/order/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateOrder, Order } from "../types/Order";
import type { OrderFilters } from "../types/OrderFilters";

function useGetOrdersQuery(page: number, filters: OrderFilters) {
   const params = { page, ...filters };

   return useQuery<PaginatedResponse<Order>, Error>({
      queryKey: ["orders", page, filters],
      queryFn: () => orderService.getPaginated(params),
      refetchOnWindowFocus: false,
   });
}

function useCreateOrderMutation() {
   const queryClient = useQueryClient();

   return useMutation<Order, Error, CreateOrder>({
      mutationFn: (data: CreateOrder) => orderService.create(data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["orders"]})
      }
   });
}

export { 
   useGetOrdersQuery,
   useCreateOrderMutation
};
