import { EmptyData } from "@/components/empty-data";
import type { OrderHistory } from "@/models/order-history";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StageHeader } from "@/pages/stages/components/StageHeader";
import { ListItem } from "@/shared/components/ListItem";
import { UtilsService } from "@/utils/services/utils-service";
import { UserAssignedTooltip } from "./UserAssignedTooltip";
import type { Order } from "@/models/order";

interface OrderHistoryAccordionProps {
   order: Order
   orderHistory: OrderHistory[]
}

export function OrderHistoryAccordion({ order, orderHistory }: OrderHistoryAccordionProps) {
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
               className="mb-2"
            >
               <AccordionItem value={item.etapa.descricao}>
                  <AccordionTrigger className="rounded-none cursor-pointer hover:no-underline bg-primary/75 px-3 py-2">
                     <StageHeader stage={item.etapa} />
                  </AccordionTrigger>
                  
                  <AccordionContent className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 p-4 lg:p-6 bg-neutral-100 border">
                     <ListItem className="lg:col-span-3 xl:col-span-4" label="Observações" value={item.observacoes} />

                     {item.etapa.descricao == "Medição" && (
                        <>
                           <ListItem 
                              label="Automação" 
                              value={UtilsService.formatBoolean(order.hasAutomacao)} 
                           />
                           <ListItem 
                              label="Orçamento para Investimento (Banco)" 
                              value={UtilsService.formatBoolean(order.hasOrcamentoBanco)} 
                           />
                           <ListItem 
                              label="Projeto para Plantio" 
                              value={UtilsService.formatBoolean(order.hasProjetoPlantio)} 
                           />
                           <ListItem 
                              label="Quantidade de Setores" 
                              value={order.quantidadeSetores ?? "Não informado"} 
                           />
                        </>
                     )}

                     <ListItem label="Iniciada em" value={UtilsService.formatTimestamp(item.criadoEm)} />
                     <ListItem label="Concluída em" value={UtilsService.formatTimestamp(item.concluidoEm)} />

                     <ListItem 
                        label="Concluída por"
                        value={(
                           <UserAssignedTooltip 
                              key={index} 
                              userAssigned={item.concluidoPor}
                              fullName={true}
                           />
                        )} 
                     />

                     <ListItem 
                        label="Atribuídos" 
                        value={(
                           <div className="flex flex-wrap gap-1">
                              {item.atribuicoes?.map((atribuicao, index) => (
                                 <UserAssignedTooltip 
                                    key={index} 
                                    userAssigned={atribuicao.usuario}
                                    fullName={true}
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