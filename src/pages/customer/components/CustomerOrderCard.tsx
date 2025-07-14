import { Badge } from "@/components/ui/badge";
import type { ServiceOrder } from "@/models/service-order";
import { UtilsService } from "@/utils/services/utils-service";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerOrderCardProps {
  order: ServiceOrder;
}

export function CustomerOrderCard({ order }: CustomerOrderCardProps) {
   const historicoAtual = order.historicoOs[0];
   const isConcluida = !!historicoAtual.concluidoEm;

   return (
      <Link
         to={`/sistema/ordens/info/${order.id}`}
         className="group flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors shadow-sm"
      >
         <div className="bg-primary/10 text-primary rounded-xl p-3">
            <ClipboardList className="h-6 w-6" />
         </div>

         <div className="flex flex-col justify-between gap-1 w-full">
            <div className="flex items-center justify-between">
               <p className="text-sm font-semibold text-primary">
                  Ordem de serviço
               </p>
               {isConcluida ? (
                  <Badge variant="success">Concluída</Badge>
               ) : (
                  <Badge variant="warning">Em andamento</Badge>
               )}
            </div>

            <p className="text-sm font-medium">
               {historicoAtual.etapa.descricao}
            </p>

            <p className="text-sm text-neutral-500 mt-1">
               Criada em {UtilsService.formatDate(order.criadoEm)}
            </p>
         </div>
      </Link>
   );
}
