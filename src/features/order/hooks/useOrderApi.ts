import { orderService } from '@/features/order/services/orderService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateOrder, Order } from '../types/Order';
import type { OrderFilters } from '../types/OrderFilters';

function useGetOrdersQuery(page: number, filters: OrderFilters) {
    const params = { page, ...filters };

    return useQuery({
        queryKey: ['orders', page, filters],
        queryFn: () => orderService.getOrdersPaginated(params),
        refetchOnWindowFocus: false,
    });
}

function useCreateOrderMutation() {
    const queryClient = useQueryClient();

    return useMutation<Order, Error, CreateOrder>({
        mutationFn: (data: CreateOrder) => orderService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export { useCreateOrderMutation, useGetOrdersQuery };
