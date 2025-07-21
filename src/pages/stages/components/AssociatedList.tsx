import { EmptyData } from "@/components/empty-data";
import { DisassociateForm } from "./DisassociateForm";
import { StageHeader } from "./StageHeader";
import type { AssociatedUsers, Stage } from "@/models/stage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AssociatedListProps {
   stages: Stage[]
   associated: AssociatedUsers[]
   onDisassociate: (stageId: number, userId: number) => void
   disableActions: boolean
}

export function AssociatedList({ 
   stages, 
   associated,
   onDisassociate,
   disableActions
}: AssociatedListProps) {
   if (!stages || !associated) {
      return <EmptyData />
   }

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-8 my-4">
         {stages.map((stage, index) => {
            const vinculados = associated.find(a => a.stageId === stage.id);

            return (
               <Accordion key={index} type="single" collapsible defaultValue={stage.descricao}>
                  <AccordionItem value={stage.descricao}>
                     <AccordionTrigger className="rounded-none cursor-pointer hover:no-underline bg-primary/5 p-4">
                        <StageHeader stage={stage} />
                     </AccordionTrigger>
                     
                     <AccordionContent className="p-2 bg-primary/2">
                        {vinculados && vinculados.users.length > 0 ? (
                           <ul className="text-sm">
                              {vinculados.users.map(user => (
                                 <li 
                                    key={user.id} 
                                    className="flex items-center justify-between gap-4"
                                 >
                                    <div className="flex items-center gap-1">
                                       <DisassociateForm
                                          stage={stage} 
                                          user={user}
                                          onSubmit={onDisassociate}
                                          disableActions={disableActions}
                                       />
                                       <span className="font-medium">
                                          {user.nome}
                                       </span> 
                                    </div>

                                    <span className="text-neutral-500 text-xs">
                                       {user.role?.descricao}
                                    </span>
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <p className="text-sm p-4 text-neutral-500">
                              Nenhum usuário vinculado
                           </p>
                        )}
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            );
         })}
      </div>
   )
}