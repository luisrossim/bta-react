import { queryClient } from '@/lib/reactQuery';
import type { ApiErrorDetails } from '@/shared/utils/extractAxiosError';
import { showError, showSuccess } from '@/shared/utils/showMessage';
import {
    useMutation,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { User } from '../types/User';

function useGetUsersQuery(options?: Partial<UseQueryOptions<User[]>>) {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userService.get(),
        ...options,
    });
}

function useGetUserQuery(id?: string) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => {
            if (!id) throw new Error('ID is required');
            return userService.getById(id);
        },
        enabled: Boolean(id),
    });
}

function useChangeStatusMutation() {
    return useMutation({
        mutationFn: (userId: string) => userService.changeStatus(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showSuccess('Status alterado com sucesso');
        },
        onError: (error: ApiErrorDetails) => {
            showError(error.message);
        },
    });
}

function useCreateUserMutation() {
    return useMutation({
        mutationFn: (values: any) => userService.create(values),
    });
}

function useUpdateUserMutation() {
    return useMutation({
        mutationFn: ({ id, values }: any) => userService.update(id, values),
    });
}

export {
    useChangeStatusMutation,
    useCreateUserMutation,
    useGetUserQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
};
