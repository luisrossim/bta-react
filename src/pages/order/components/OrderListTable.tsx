import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ServiceOrder } from "@/models/service-order";
import { Badge } from "@/components/ui/badge";
import { UtilsService } from "@/utils/services/utils-service";
import { EmptyData } from "@/components/empty-data";
import { LoadingWrapper } from "@/components/loading";
import { calculateExecutionTime } from "../utils/calculateExecutionTime";
import { UserAssignedTooltip } from "./UserAssignedTooltip";
import { DropdownActions } from "@/shared/components/DropdownActions";

interface OrderListTableProps {
   orders: ServiceOrder[]
   loading: boolean
   navigate: (id: number) => void
}

export function OrderListTable({ orders, loading, navigate }: OrderListTableProps){
   const isMobile = useIsMobile();

   if (loading) return <LoadingWrapper />

   if (!orders || orders.length == 0) return <EmptyData />

   return (
      <Table className="table-striped">
         <TableHeader>
               <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Usuários</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Execução</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
               </TableRow>
         </TableHeader>
         <TableBody>
               {orders.map((order) => {
                  const historicoAtual = order.historicoOs[0];

                  return (
                     <TableRow key={order.id}>
                        <TableCell className="font-medium">
                           {order.cliente.nome.length > 16 && isMobile
                              ? `${order.cliente.nome.slice(0, 16)}...`
                              : order.cliente.nome
                           }
                        </TableCell>

                        <TableCell className="text-primary font-medium">
                           {historicoAtual.etapa.descricao}
                        </TableCell>

                        <TableCell>
                           {historicoAtual.atribuicoes?.map((atribuicao, index) => (
                              <UserAssignedTooltip key={index} userAssigned={atribuicao.usuario} />
                           ))}
                        </TableCell>

                        <TableCell>
                           {historicoAtual.concluidoEm 
                              ? <Badge variant={"success"}>Concluída</Badge> 
                              : <Badge variant={"warning"}>Em andamento</Badge>
                           }
                        </TableCell>

                        <TableCell className="text-neutral-500">
                              {calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
                        </TableCell>

                        <TableCell className="text-neutral-500">
                              {UtilsService.formatTimestamp(historicoAtual.criadoEm)}
                        </TableCell>

                        <TableCell className="flex justify-end">
                           <DropdownActions 
                              actions={[
                                 {
                                    label: 'Visualizar',
                                    onClick: () => navigate(order.id)
                                 }
                              ]}
                           />
                        </TableCell>
                     </TableRow>
                  )
               })}
         </TableBody>
      </Table>
   )
}