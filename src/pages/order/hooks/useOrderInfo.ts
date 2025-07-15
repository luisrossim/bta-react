import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ServiceOrder } from '@/models/service-order'
import { type AtribuicaoRequest, type ServiceOrderHistory } from '@/models/service-order-history'
import { serviceOrderService } from '@/services/order-service'
import { ToastService } from '@/utils/services/toast-service'
import { serviceOrderHistoryService } from '@/services/order-history-service'

export function useOrderInfo() {
   const { id } = useParams()
   const [order, setOrder] = useState<ServiceOrder | null>(null)
   const [historicoAtual, setHistoricoAtual] = useState<ServiceOrderHistory | null>(null)
   const [historicoPassados, setHistoricoPassados] = useState<ServiceOrderHistory[]>([])

   useEffect(() => {
      if (id) loadServiceOrderInfo()
   }, [id])

   const loadServiceOrderInfo = async () => {
      try {
         const _order = await serviceOrderService.getById(id!)
         const [atual, ...passados] = _order.historicoOs
         setOrder(_order)
         setHistoricoAtual(atual)
         setHistoricoPassados(passados)
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
         await serviceOrderHistoryService.atribuir(data);
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
         await serviceOrderHistoryService.desatribuir(data)
         ToastService.showSuccess("Usuário desatribuído com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const concluir = async () => {
      if (!historicoAtual) return;

      try {
         await serviceOrderHistoryService.concluir(historicoAtual.id)
         ToastService.showSuccess("Etapa concluída com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      }
   }

   const avancar = async () => {
      if (!historicoAtual) return;

      try {
         await serviceOrderHistoryService.avancar(historicoAtual.id)
         ToastService.showSuccess("Etapa atualizada com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
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
   }
}
