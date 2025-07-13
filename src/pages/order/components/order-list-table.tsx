import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ServiceOrder } from "@/models/service-order";
import { Badge } from "@/components/ui/badge";
import { UtilsService } from "@/utils/services/utils-service";
import { AlignRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useExecutionTime } from "@/hooks/use-execution-time";
import { EmptyData } from "@/components/empty-data";
import { LoadingWrapper } from "@/components/loading";
import type { ReactNode } from "react";
import type { User } from "@/models/user";

interface ServiceOrderListTableProps {
   orders: ServiceOrder[]
   loading: boolean
   navigate: (id: number) => void
}

export function ServiceOrderListTable({ orders, loading, navigate }: ServiceOrderListTableProps){
   const { calculateExecutionTime } = useExecutionTime();
   const isMobile = useIsMobile();

   if (loading) return <LoadingWrapper />

   if (!orders || orders.length == 0) return <EmptyData />

   const userTooltip = (user: User, index: number): ReactNode => {
      return (
         <Tooltip>
            <TooltipTrigger asChild>
               <span
                  key={index}
                  className="inline-flex items-center hover:cursor-default justify-center bg-neutral-200 text-neutral-700 rounded-full w-6 h-6 mr-1 text-xs font-semibold"
               >
                  {user.nome?.charAt(0)?.toUpperCase() || "?"}
               </span>
            </TooltipTrigger>
            <TooltipContent>
               <p>{user.nome}</p>
            </TooltipContent>
         </Tooltip>
      )
   }

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
                           {historicoAtual.atribuicoes?.map(
                              (atribuicao, index) => userTooltip(atribuicao.usuario, index)
                           )}
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
                              {UtilsService.formatDate(historicoAtual.criadoEm)}
                        </TableCell>

                        <TableCell className="flex justify-end">
                           <Button size={"sm"} variant={"link"} onClick={() => navigate(order.id)}> 
                              <AlignRight size={16} className="text-primary" />
                           </Button>
                        </TableCell>
                     </TableRow>
                  )
               })}
         </TableBody>
      </Table>
   )
}