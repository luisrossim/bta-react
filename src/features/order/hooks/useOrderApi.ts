import { orderService } from '@/features/order/services/orderService';
import { queryClient } from '@/lib/reactQuery';
import { showSuccess } from '@/shared/utils/showMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderHistoryService } from '../services/orderHistoryService';
import type { CommentsMutation } from '../types/CommentsMutation';
import type { CreateOrder } from '../types/Order';
import type { OrderFilters } from '../types/OrderFilters';
import type { AtribuicaoRequest } from '../types/OrderHistory';
import type {
    AssistanceMutation,
    MeasurementMutation,
} from '../types/SheetsMutation';

function useGetOrdersQuery(page: number, filters: OrderFilters) {
    const params = { page, ...filters };

    return useQuery({
        queryKey: ['orders', page, filters],
        queryFn: () => orderService.getOrdersPaginated(params),
        refetchOnWindowFocus: false,
    });
}

function useGetOrderQuery(id?: string) {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => {
            if (!id) throw new Error('ID is required');
            return orderService.getById(id);
        },
        enabled: Boolean(id),
        retry: false,
    });
}

function useCreateOrderMutation() {
    return useMutation({
        mutationFn: (data: CreateOrder) => orderService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            showSuccess('Ordem de serviço criada com sucesso');
        },
    });
}

function useUserAssignMutation() {
    return useMutation({
        mutationFn: (data: AtribuicaoRequest) => {
            return orderHistoryService.atribuir(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Usuário atribuído com sucesso');
        },
    });
}

function useSelfAssignMutation() {
    return useMutation({
        mutationFn: (data: AtribuicaoRequest) => {
            return orderHistoryService.seAtribuir(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Atribuído com sucesso');
        },
    });
}

function useUserDisassociateMutation() {
    return useMutation({
        mutationFn: (data: AtribuicaoRequest) => {
            return orderHistoryService.desatribuir(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Usuário desatribuído com sucesso');
        },
    });
}

function useConcludeMutation() {
    return useMutation({
        mutationFn: (historyId: string) => {
            return orderHistoryService.concluir(historyId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Etapa concluída com sucesso');
        },
    });
}

function useAdvanceMutation() {
    return useMutation({
        mutationFn: (historyId: string) => {
            return orderHistoryService.avancar(historyId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Etapa atualizada com sucesso');
        },
    });
}

function useCommentsMutation() {
    return useMutation({
        mutationFn: ({ historyId, values }: CommentsMutation) => {
            return orderHistoryService.comments(historyId, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Etapa atualizada com sucesso');
        },
    });
}

function useMeasurementMutation() {
    return useMutation({
        mutationFn: ({ orderId, values }: MeasurementMutation) => {
            return orderService.measurement(orderId, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Informações atualizadas com sucesso');
        },
    });
}

function useAssistanceMutation() {
    return useMutation({
        mutationFn: ({ orderId, values }: AssistanceMutation) => {
            return orderService.assistance(orderId, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Informações atualizadas com sucesso');
        },
    });
}

function useUploadFileMutation() {
    return useMutation({
        mutationFn: ({ orderId, file }: any) => {
            return orderService.uploadAttachment(orderId, file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            showSuccess('Informações atualizadas com sucesso');
        },
    });
}

export {
    useAdvanceMutation,
    useAssistanceMutation,
    useCommentsMutation,
    useConcludeMutation,
    useCreateOrderMutation,
    useGetOrderQuery,
    useGetOrdersQuery,
    useMeasurementMutation,
    useSelfAssignMutation,
    useUploadFileMutation,
    useUserAssignMutation,
    useUserDisassociateMutation,
};
