import { Badge } from "@/components/ui/badge";
import type { Order } from "@/models/order";
import { UtilsService } from "@/utils/services/utils-service";
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
         to={`/sistema/ordens/info/${order.id}`}
         className="group flex items-start gap-4 p-5 rounded border bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
         <div className="bg-primary text-white rounded-xl p-2">
            <ClipboardList className="h-5 w-5" />
         </div>

         <div className="flex flex-col justify-between gap-1 text-sm w-full">
            <p className="font-semibold">
               {historicoAtual.etapa.descricao}
            </p>

            <p className="text-neutral-500 mb-2">
               Criada em {UtilsService.formatTimestamp(order.criadoEm)}
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
