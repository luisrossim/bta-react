import { Badge } from "@/components/ui/badge";
import type { Order } from "@/features/order/types/Order";
import { formatTimestamp } from "@/shared/utils/formatDate";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerOrderCardProps {
  order: Order;
}

export function CustomerOrderCard({ order }: CustomerOrderCardProps) {
   const historicoAtual = order.historicoOs[0];
   const isConcluida = !!historicoAtual.concluidoEm;

   return (
      <Link
         to={`/sistema/ordens/${order.id}`}
         className="group flex items-start gap-4 p-5 rounded-lg border hover:bg-muted transition-colors"
      >
         <div className="bg-primary text-white rounded-full p-2">
            <ClipboardList className="h-4 w-4" />
         </div>

         <div className="flex flex-col justify-between gap-1 text-sm w-full">
            <p className="font-medium">
               {historicoAtual.etapa.descricao}
            </p>

            <p className="text-muted-foreground font-normal text-xs mb-2">
               Criada em {formatTimestamp(order.criadoEm)}
            </p>
            
            {isConcluida ? (
               <Badge variant="success">Concluída</Badge>
            ) : (
               <Badge variant="warning">Em andamento</Badge>
            )}
         </div>
      </Link>
   );
}
