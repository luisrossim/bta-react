import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ServiceOrder } from '@/models/service-order'
import { atribuirFormSchema, type AtribuirForm, type ServiceOrderHistory } from '@/models/service-order-history'
import { serviceOrderService } from '@/services/order-service'
import { ToastService } from '@/utils/services/toast-service'
import { serviceOrderHistoryService } from '@/services/order-history-service'

export function useOrderInfo() {
   const { id } = useParams()
   const [order, setOrder] = useState<ServiceOrder | null>(null)
   const [historicoAtual, setHistoricoAtual] = useState<ServiceOrderHistory | null>(null)
   const [historicoPassados, setHistoricoPassados] = useState<ServiceOrderHistory[]>([])
   const [loading, setLoading] = useState(false)

   const form = useForm<AtribuirForm>({
      resolver: zodResolver(atribuirFormSchema)
   })

   useEffect(() => {
      if (id) loadServiceOrderInfo()
   }, [id])

   const loadServiceOrderInfo = async () => {
      setLoading(true)
      try {
         const _order = await serviceOrderService.getById(id!)
         const [atual, ...passados] = _order.historicoOs
         setOrder(_order)
         setHistoricoAtual(atual)
         setHistoricoPassados(passados)
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }

   const atribuir = async (data: AtribuirForm) => {
      setLoading(true)
      try {
         await serviceOrderHistoryService.atribuir(data)
         ToastService.showSuccess("Usuário atribuído com sucesso.")
         loadServiceOrderInfo()
         form.reset()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }

   const desatribuir = async (data: AtribuirForm) => {
      setLoading(true)
      try {
         await serviceOrderHistoryService.desatribuir(data)
         ToastService.showSuccess("Usuário desatribuído com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }

   const concluir = async () => {
      if (!historicoAtual) return
      setLoading(true)
      try {
         await serviceOrderHistoryService.concluir(historicoAtual.id)
         ToastService.showSuccess("Etapa concluída com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }

   const avancar = async () => {
      if (!historicoAtual) return
      setLoading(true)
      try {
         await serviceOrderHistoryService.avancar(historicoAtual.id)
         ToastService.showSuccess("Etapa atualizada com sucesso.")
         loadServiceOrderInfo()
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }

   return {
      id,
      order,
      historicoAtual,
      historicoPassados,
      loading,
      form,
      atribuir,
      desatribuir,
      concluir,
      avancar,
   }
}
