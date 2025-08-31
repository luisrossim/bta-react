import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { User } from '../types/User';

function useGetUsersQuery(options?: Partial<UseQueryOptions<User[]>>) {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userService.get(),
        ...options,
    });
}

export { useGetUsersQuery };
