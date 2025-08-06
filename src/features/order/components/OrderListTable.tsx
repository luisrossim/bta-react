import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { Badge } from "@/components/ui/badge";
import { EmptyData } from "@/shared/components/EmptyData";
import { UserAssignedTooltip } from "./UserAssignedTooltip";
import { DropdownActions } from "@/shared/components/DropdownActions";
import { formatTimestamp } from "@/shared/utils/formatDate";
import type { Order } from "../types/Order";
import { useCalculateExecutionTime } from "../hooks/useCalculateExecutionTime";
import { LoadingIcon } from "@/shared/components/LoadingIcon";

interface OrderListTableProps {
   data: Order[]
   isLoading: boolean
   navigate: (id: string) => void
}

export function OrderListTable({ data, isLoading, navigate }: OrderListTableProps){
   const isMobile = useIsMobile();
   const { calculateExecutionTime } = useCalculateExecutionTime();

   if (!data || data.length == 0) return <EmptyData />

   if(isLoading) return <LoadingIcon />

   return (
      <Table className="table-striped">
         <TableHeader>
               <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Atribuídos</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Execução</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
               </TableRow>
         </TableHeader>
         <TableBody>
               {data.map((order) => {
                  const historicoAtual = order.historicoOs[0];

                  return (
                     <TableRow key={order.id}>
                        <TableCell className="text-primary text-xs">
                           #{order.numero}
                        </TableCell>

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
                              <UserAssignedTooltip key={index} user={atribuicao.usuario} />
                           ))}
                        </TableCell>

                        <TableCell>
                           {historicoAtual.concluidoEm 
                              ? <Badge variant={"success"}>Concluída</Badge> 
                              : <Badge variant={"warning"}>Em andamento</Badge>
                           }
                        </TableCell>

                        <TableCell className="text-slate-500">
                              {calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
                        </TableCell>

                        <TableCell className="text-slate-500">
                              {formatTimestamp(historicoAtual.criadoEm)}
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