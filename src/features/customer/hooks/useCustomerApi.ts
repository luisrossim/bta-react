import { customerService } from '@/features/customer/services/customerService';
import {
    type CreateCustomer,
    type Customer,
    type CustomerRaw,
    type UpdateCustomer,
} from '@/features/customer/types/Customer';
import type { PaginatedResponse } from '@/shared/types/PaginatedResponse';
import {
    useMutation,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';

function useGetCustomersQuery(search: string, page: number) {
    const params: Record<string, any> = { search, page };

    return useQuery<PaginatedResponse<Customer>, Error>({
        queryKey: ['customers', page, search],
        queryFn: () => customerService.getPaginated(params),
        refetchOnWindowFocus: false,
    });
}

function useGetCustomersRawQuery(
    options?: Partial<UseQueryOptions<CustomerRaw[]>>
) {
    return useQuery({
        queryKey: ['customers-raw'],
        queryFn: () => customerService.getAll(),
        ...options,
    });
}

function useGetCustomerQuery(id?: string) {
    return useQuery<Customer, Error>({
        queryKey: ['customer', id],
        queryFn: () => {
            if (!id) throw new Error('ID is required');
            return customerService.getById(id);
        },
        enabled: Boolean(id),
    });
}

function useCreateCustomerMutation() {
    return useMutation<Customer, Error, CreateCustomer>({
        mutationFn: (data: CreateCustomer) => customerService.create(data),
    });
}

function useUpdateCustomerMutation() {
    return useMutation<Customer, Error, UpdateCustomer>({
        mutationFn: ({ id, data }) => customerService.update(id, data),
    });
}

export {
    useCreateCustomerMutation,
    useGetCustomerQuery,
    useGetCustomersQuery,
    useGetCustomersRawQuery,
    useUpdateCustomerMutation,
};
