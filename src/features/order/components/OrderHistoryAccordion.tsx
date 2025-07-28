import { EmptyData } from "@/shared/components/EmptyData";
import type { OrderHistory } from "@/features/order/types/OrderHistory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StageHeader } from "@/features/stages/components/StageHeader";
import { ListItem } from "@/shared/components/ListItem";
import { formatBoolean } from "@/shared/utils/formatBoolean";
import { formatTimestamp } from "@/shared/utils/formatDate";
import type { Order } from "../types/Order";
import { UserAssignedTooltip } from "./UserAssignedTooltip";

interface HistoryAccordionProps {
   order: Order
   orderHistory: OrderHistory[]
}

export function OrderHistoryAccordion({ order, orderHistory }: HistoryAccordionProps) {
   if (!orderHistory || orderHistory.length === 0) {
      return <EmptyData />
   } 

   return (
      <>
         {orderHistory.map((item, index) => (
            <Accordion 
               key={index} 
               type="single" 
               collapsible 
               className="mb-3"
            >
               <AccordionItem value={item.etapa.descricao}>
                  <AccordionTrigger className="cursor-pointer hover:no-underline items-center rounded-b-none rounded-tr-[6px] border rounded-tl-[6px] px-2 py-1 bg-primary/75 text-white">
                     <StageHeader stage={item.etapa} />
                  </AccordionTrigger>
                  
                  <AccordionContent className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 p-4 lg:p-6 border">
                     <ListItem 
                        className="lg:col-span-3 xl:col-span-4" 
                        label="Observações" 
                        value={item.observacoes} 
                     />

                     {item.etapa.descricao == "Medição" && (
                        <>
                           <ListItem 
                              label="Automação" 
                              value={formatBoolean(order.hasAutomacao)} 
                           />
                           <ListItem 
                              label="Orçamento para Investimento (Banco)" 
                              value={formatBoolean(order.hasOrcamentoBanco)} 
                           />
                           <ListItem 
                              label="Projeto para Plantio" 
                              value={formatBoolean(order.hasProjetoPlantio)} 
                           />
                           <ListItem 
                              label="Quantidade de Setores" 
                              value={order.quantidadeSetores ?? "Não informado"} 
                           />
                        </>
                     )}

                     <ListItem 
                        label="Iniciada em" 
                        value={formatTimestamp(item.criadoEm)} 
                     />

                     <ListItem 
                        label="Concluída em" 
                        value={formatTimestamp(item.concluidoEm)} 
                     />

                     <ListItem 
                        label="Concluída por"
                        value={(
                           <UserAssignedTooltip 
                              key={index} 
                              user={item.concluidoPor}
                           />
                        )} 
                     />

                     <ListItem 
                        label="Técnicos atribuídos" 
                        value={(
                           <div className="flex flex-wrap gap-1">
                              {item.atribuicoes?.map(({ usuario }, index) => (
                                 <UserAssignedTooltip 
                                    key={index} 
                                    user={usuario}
                                 />
                              ))}
                           </div>
                        )} 
                     />
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         ))}
      </>
   )
}