import { customerService } from '@/features/customer/services/customerService';
import {
    type CreateCustomer,
    type Customer,
    type UpdateCustomer,
} from '@/features/customer/types/Customer';
import type { PaginatedResponse } from '@/shared/types/PaginatedResponse';
import { useMutation, useQuery } from '@tanstack/react-query';

function useGetCustomersQuery(page: number, search: string) {
    const params: Record<string, any> = { page };

    if (search.trim()) {
        const isCpf = /^\d/.test(search);

        if (isCpf) {
            params.cpf = search;
        } else {
            params.nome = search;
        }
    }

    return useQuery<PaginatedResponse<Customer>, Error>({
        queryKey: ['customers', page, search],
        queryFn: () => customerService.getPaginated(params),
        refetchOnWindowFocus: false,
    });
}

function useGetCustomerQuery(id?: string) {
    return useQuery<Customer, Error>({
        queryKey: ['get-customer-id', id],
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
    useUpdateCustomerMutation,
};
