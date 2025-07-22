import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Assistance, Measurement, Order } from '@/models/order'
import { type AtribuicaoRequest, type CommentsHistory, type OrderHistory } from '@/models/order-history'
import { orderService } from '@/services/order-service'
import { ToastService } from '@/utils/services/toast-service'
import { orderHistoryService } from '@/services/order-history-service'
import { toast } from 'sonner'

export function useOrderInfo() {
   const { id } = useParams()
   const [order, setOrder] = useState<Order | null>(null)
   const [historicoAtual, setHistoricoAtual] = useState<OrderHistory | null>(null)
   const [historicoPassados, setHistoricoPassados] = useState<OrderHistory[]>([])
   const [disableActions, setDisableActions] = useState<boolean>(false); 

   useEffect(() => {
      if (id) loadServiceOrderInfo()
   }, [id])

   const loadServiceOrderInfo = async () => {
      try {
         const _order = await orderService.getById(id!)
         const [atual, ...passados] = _order.historicoOs;
         setOrder(_order);
         setHistoricoAtual(atual);
         setHistoricoPassados(passados);
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const atribuir = async (userId: number) => {
      const data: AtribuicaoRequest = {
         historyId: historicoAtual!.id,
         userId
      }

      try {
         await orderHistoryService.atribuir(data);
         ToastService.showSuccess("Usuário atribuído com sucesso.")
         loadServiceOrderInfo();
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const desatribuir = async (userId: number) => {
      const data: AtribuicaoRequest = {
         historyId: historicoAtual!.id,
         userId
      }

      try {
         await orderHistoryService.desatribuir(data)
         ToastService.showSuccess("Usuário desatribuído com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const concluir = async () => {
      if (!historicoAtual) return;

      try {
         await orderHistoryService.concluir(historicoAtual.id)
         ToastService.showSuccess("Etapa concluída com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         console.log(err)
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const avancar = async () => {
      if (!historicoAtual) return;

      try {
         await orderHistoryService.avancar(historicoAtual.id)
         ToastService.showSuccess("Etapa atualizada com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const comments = async (values: CommentsHistory) => {
      if (!historicoAtual) return;

      try {
         await orderHistoryService.comments(historicoAtual.id, values)
         ToastService.showSuccess("Etapa atualizada com sucesso.")
         loadServiceOrderInfo()
         
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const saveMeasurementForm = async (values: Measurement) => {
      if(!order?.id) return;

      try {
         await orderService.saveMeasurement(order.id, values);
         ToastService.showSuccess("Formulário de medição salvo com sucesso.");
         loadServiceOrderInfo();
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const saveAssistanceForm = async (values: Assistance) => {
      if(!order?.id) return;

      try {
         await orderService.saveAssistance(order.id, values);
         ToastService.showSuccess("Formulário de assistência salvo com sucesso.");
         loadServiceOrderInfo();
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const uploadFile = async (orderId: string, file: any) => {
      setDisableActions(true);

      const toastId = toast.loading("Salvando arquivo...");

      try {
         await orderService.uploadAttachment(orderId, file);
         toast.success("Arquivo salvo com sucesso!", { id: toastId });
         loadServiceOrderInfo();

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   const viewAttachment = async (attachmentId: string) => {
      setDisableActions(true);

      const toastId = toast.loading("Buscando arquivo...");

      try {
         const attachment = await orderService.viewAttachment(attachmentId);
         toast.success("Arquivo encontrado com sucesso!", { id: toastId });
         return attachment;

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   return {
      id,
      order,
      historicoAtual,
      historicoPassados,
      atribuir,
      desatribuir,
      concluir,
      avancar,
      comments,
      uploadFile,
      viewAttachment,
      saveMeasurementForm,
      saveAssistanceForm,
      disableActions
   }
}
