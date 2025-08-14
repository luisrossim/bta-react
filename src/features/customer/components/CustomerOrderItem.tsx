import { Badge } from "@/components/ui/badge";
import type { Order } from "@/features/order/types/Order";
import { formatTimestamp } from "@/shared/utils/formatDate";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerOrderItemProps {
  order: Order;
}

export function CustomerOrderItem({ order }: CustomerOrderItemProps) {
   const historicoAtual = order.historicoOs[0];
   const isConcluida = !!historicoAtual.concluidoEm;

   return (
      <Link
         to={`/sistema/ordens/${order.id}`}
         className="group flex items-center gap-4 p-4 rounded-md border hover:bg-accent transition-colors"
      >
         <div className="bg-primary text-white rounded-full p-2">
            <ClipboardList className="h-4 w-4" />
         </div>

         <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 text-sm w-full">
            <div className="flex flex-col gap-1">
               <p className="font-medium">
                  {historicoAtual.etapa.descricao}
               </p>
               <p className="text-muted-foreground text-xs">
                  Criada em {formatTimestamp(order.criadoEm)}
               </p>
               <span className="text-primary text-xs">
                  N° {order.numero}
               </span>
            </div>

            <div>
               {isConcluida ? (
                  <Badge variant="success">Concluída</Badge>
               ) : (
                  <Badge variant="warning">Em andamento</Badge>
               )}
            </div>
         </div>
      </Link>
   );
}
