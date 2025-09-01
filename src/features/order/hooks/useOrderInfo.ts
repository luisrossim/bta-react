import { orderHistoryService } from '@/features/order/services/orderHistoryService';
import { orderService } from '@/features/order/services/orderService';
import {
    type AtribuicaoRequest,
    type CommentsHistory,
    type OrderHistory,
} from '@/features/order/types/OrderHistory';
import { showError, showSuccess } from '@/shared/utils/showMessage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type { Assistance, Measurement, Order } from '../types/Order';

export function useOrderInfo() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [historicoAtual, setHistoricoAtual] = useState<OrderHistory | null>(
        null
    );
    const [historicoPassados, setHistoricoPassados] = useState<OrderHistory[]>(
        []
    );
    const [disableActions, setDisableActions] = useState<boolean>(false);

    useEffect(() => {
        if (id) loadServiceOrderInfo();
    }, [id]);

    const loadServiceOrderInfo = async () => {
        try {
            const _order = await orderService.getById(id!);
            const [atual, ...passados] = _order.historicoOs;
            setOrder(_order);
            setHistoricoAtual(atual);
            setHistoricoPassados(passados);
        } catch (err: any) {
            showError(err.message);
        }
    };

    const atribuir = async (userId: string) => {
        const data: AtribuicaoRequest = {
            historyId: historicoAtual!.id,
            userId,
        };

        try {
            await orderHistoryService.atribuir(data);
            showSuccess('Usuário atribuído com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const seAtribuir = async (userId: string) => {
        const data: AtribuicaoRequest = {
            historyId: historicoAtual!.id,
            userId,
        };

        try {
            await orderHistoryService.seAtribuir(data);
            showSuccess('Auto atribuição realizada com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const desatribuir = async (userId: string) => {
        const data: AtribuicaoRequest = {
            historyId: historicoAtual!.id,
            userId,
        };

        try {
            await orderHistoryService.desatribuir(data);
            showSuccess('Usuário desatribuído com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const concluir = async () => {
        if (!historicoAtual) return;

        try {
            await orderHistoryService.concluir(historicoAtual.id);
            showSuccess('Etapa concluída com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const avancar = async () => {
        if (!historicoAtual) return;

        try {
            await orderHistoryService.avancar(historicoAtual.id);
            showSuccess('Etapa atualizada com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const comments = async (values: CommentsHistory) => {
        if (!historicoAtual) return;

        try {
            await orderHistoryService.comments(historicoAtual.id, values);
            showSuccess('Etapa atualizada com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const saveMeasurement = async (values: Measurement) => {
        if (!order) return;

        try {
            await orderService.saveMeasurement(order.id, values);
            showSuccess('Formulário de medição salvo com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const saveAssistance = async (values: Assistance) => {
        if (!order) return;

        try {
            await orderService.saveAssistance(order.id, values);
            showSuccess('Formulário de assistência salvo com sucesso.');
            loadServiceOrderInfo();
        } catch (err: any) {
            showError(err.message);
        }
    };

    const uploadFile = async (file: FormData) => {
        if (!order) return;

        setDisableActions(true);

        const toastId = toast.loading('Salvando arquivo...');

        try {
            await orderService.uploadAttachment(order.id, file);
            toast.success('Arquivo salvo com sucesso!', { id: toastId });
            loadServiceOrderInfo();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message, {
                id: toastId,
            });
        } finally {
            setDisableActions(false);
        }
    };

    const viewAttachment = async (attachmentId: string) => {
        setDisableActions(true);

        try {
            const attachment = await orderService.viewAttachment(attachmentId);
            return attachment;
        } catch (err: any) {
            showError(err?.response?.data?.message || err?.message);
        } finally {
            setDisableActions(false);
        }
    };

    return {
        id,
        order,
        historicoAtual,
        historicoPassados,
        atribuir,
        seAtribuir,
        desatribuir,
        concluir,
        avancar,
        comments,
        uploadFile,
        viewAttachment,
        saveMeasurement,
        saveAssistance,
        disableActions,
    };
}
