import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { Badge } from "@/components/ui/badge";
import { UserAssignedTooltip } from "./UserAssignedTooltip";
import { formatTimestamp } from "@/shared/utils/formatDate";
import type { Order } from "../types/Order";
import { useCalculateExecutionTime } from "../hooks/useCalculateExecutionTime";
import { LoadingIcon } from "@/shared/components/LoadingIcon";
import { GenericTable, type Column } from "@/shared/components/GenericTable";
import { useNavigate } from "react-router-dom";

interface OrderListTableProps {
   data: Order[]
   isFetching: boolean
}

export function OrderListTable({ 
   data, 
   isFetching, 
}: OrderListTableProps){
   const { calculateExecutionTime } = useCalculateExecutionTime();
   const navigate = useNavigate();
   const isMobile = useIsMobile();

   if(isFetching) return <LoadingIcon />

   const columns: Column<Order>[] = [
      {
         header: "N°",
         render: (order) => (
            <span className="text-primary text-sm">
               {order.numero}
            </span>
         )
      },
      {
         header: "Cliente",
         render: (order) => (
            <span>
               {order.cliente.nome.length > 28 && isMobile
                  ? `${order.cliente.nome.slice(0, 28)}...`
                  : order.cliente.nome
               }
            </span>
         )
      },
      {
         header: "Etapa atual",
         render: (order) => (
            <span className="text-primary font-medium">
               {order.historicoOs[0].etapa.descricao}
            </span>
         )
      },
      {
         header: "Atribuídos",
         render: (order) => (
            <>
               {order.historicoOs[0].atribuicoes?.map((atribuicao, index) => (
                  <UserAssignedTooltip key={index} user={atribuicao.usuario} />
               ))}
            </>
         )
      },
      {
         header: "Situação",
         render: (order) => (
            <>
               {order.historicoOs[0].concluidoEm 
                  ? <Badge variant={"success"}>Concluída</Badge> 
                  : <Badge variant={"warning"}>Em andamento</Badge>
               }
            </>
         )
      },
      {
         header: "Tempo de execução",
         render: (order) => (
            <span>
               {calculateExecutionTime(order.historicoOs[0].criadoEm, order.historicoOs[0].concluidoEm)}
            </span>
         )
      },
      {
         header: "Atualizado em",
         render: (order) => (
               <span className="text-muted-foreground">
                  {formatTimestamp(order.historicoOs[0].atualizadoEm)}
               </span>
         )
      },
      {
         header: "Criado em",
         render: (order) => (
               <span className="text-muted-foreground">
                  {formatTimestamp(order.criadoEm)}
               </span>
         )
      },
   ];

   return (
      <GenericTable
         data={data}
         columns={columns}
         actions={(order) => [
            {
               label: 'Visualizar',
               onClick: () => navigate(`/sistema/ordens/${order.id}`)
            }
         ]}
      />
   );
}