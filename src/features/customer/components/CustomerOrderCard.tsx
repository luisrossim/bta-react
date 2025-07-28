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
         to={`/sistema/ordens/info/${order.id}`}
         className="group flex items-start gap-4 p-5 rounded border bg-slate-50 hover:bg-slate-100 transition-colors"
      >
         <div className="bg-primary text-white rounded-xl p-2">
            <ClipboardList className="h-5 w-5" />
         </div>

         <div className="flex flex-col justify-between gap-1 text-sm w-full">
            <p className="font-semibold">
               {historicoAtual.etapa.descricao}
            </p>

            <p className="text-slate-500 mb-2">
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
