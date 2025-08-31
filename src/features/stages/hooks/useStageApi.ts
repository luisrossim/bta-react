import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { stageService } from '../services/stageService';
import type { Stage } from '../types/Stage';

function useGetStagesQuery(options?: Partial<UseQueryOptions<Stage[]>>) {
    return useQuery({
        queryKey: ['stages'],
        queryFn: () => stageService.get(),
        ...options,
    });
}

export { useGetStagesQuery };
