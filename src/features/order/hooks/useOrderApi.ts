import type { PaginatedResponse } from "@/shared/types/PaginatedResponse";
import { orderService } from "@/features/order/services/orderService";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/Order";
import type { OrderFilters } from "../types/OrderFilters";

function useGetOrdersQuery(page: number, filters: OrderFilters) {
   const params = { page, ...filters };

   return useQuery<PaginatedResponse<Order>, Error>({
      queryKey: ["orders", page, filters],
      queryFn: () => orderService.getPaginated(params),
      refetchOnWindowFocus: false,
   });
}

export { useGetOrdersQuery };
