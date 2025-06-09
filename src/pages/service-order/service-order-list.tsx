import { LoadingWrapper } from "@/components/loading";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState } from "react";
import { serviceOrderService } from "@/services/service-order-service";
import type { ServiceOrder } from "@/models/service-order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UtilsService } from "@/utils/services/utils-service";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ServiceOrderList() {
   const [orders, setOrders] = useState<ServiceOrder[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate();
   const isMobile = useIsMobile()


   useEffect(() => {
      loadServiceOrders()
   }, [])


   const loadServiceOrders = async () => {
      setLoading(true)
      
      try {
         const _orders = await serviceOrderService.getAll();
         setOrders(_orders);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false);
      }
   }


   const handleTempoEmExecucao = (criadoEm: Date, concluidoEm: Date): string => {
       const endDate = concluidoEm ?? new Date();

      const intervaloEmDias = differenceInDays(endDate, criadoEm);
      const intervaloEmHoras = differenceInHours(endDate, criadoEm);
      const intervaloEmMinutos = differenceInMinutes(endDate, criadoEm);

      if (intervaloEmHoras === 0) {
         return `${intervaloEmMinutos} minutos`;
      } else if (intervaloEmDias === 0) {
         return `${intervaloEmHoras} horas`;
      } else {
         return `${intervaloEmDias} dias`;
      }
   };



   if(loading) return <LoadingWrapper />

   if(!orders || orders.length == 0) return <p className="text-sm text-slate-500">
      Nenhum registro encontrado
   </p>

   return (
      <>
         <div className="grid grid-cols-1 gap-4 my-4">
            <Label>Filtros</Label>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
               <div className="p-3 border rounded-sm"></div>
               <div className="p-3 border rounded-sm"></div>
               <div className="p-3 border rounded-sm"></div>
            </div>
         </div>

         <Table className="table-striped">
            <TableHeader>
                  <TableRow>
                     <TableHead>Cliente</TableHead>
                     <TableHead>Etapa</TableHead>
                     <TableHead>Situação</TableHead>
                     <TableHead>Execução</TableHead>
                     <TableHead>Criado em</TableHead>
                  </TableRow>
            </TableHeader>
            <TableBody>
                  {orders.map((order) => {
                     const historicoAtual = order.historicoOs[0];

                     return (
                        <TableRow 
                           key={order.id}
                           onClick={() => navigate(`/sistema/ordens/info/${order.id}`)}
                           className="hover:cursor-pointer"
                        >
                           <TableCell className="font-medium">
                              {order.cliente.nome.length > 16 && isMobile
                                 ? `${order.cliente.nome.slice(0, 16)}...`
                                 : order.cliente.nome
                              }
                           </TableCell>
                           <TableCell className="text-blue-600 font-medium">
                              {historicoAtual.etapa.descricao}
                           </TableCell>
                           <TableCell>
                              {historicoAtual.concluidoEm 
                                 ? <Badge variant={"success"}>Concluída</Badge> 
                                 : <Badge variant={"warning"}>Em andamento</Badge>
                              }
                           </TableCell>

                           <TableCell className="text-slate-500 p-4 lg:p-3">
                                 {handleTempoEmExecucao(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
                           </TableCell>

                           <TableCell className="text-slate-500">
                                 {UtilsService.formatDate(historicoAtual.criadoEm)}
                           </TableCell>
                        </TableRow>
                     )
                  })}
            </TableBody>
         </Table>
      </>
   )
}