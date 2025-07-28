import { EmptyData } from "@/shared/components/EmptyData";
import { DisassociateForm } from "./DisassociateForm";
import { StageHeader } from "./StageHeader";
import type { AssociatedUsers, Stage } from "@/features/stages/types/Stage";
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
                     <AccordionTrigger className="cursor-pointer items-center hover:no-underline rounded-b-none rounded-tr-[6px] border rounded-tl-[6px] px-2 py-1 bg-primary/75 text-white">
                        <StageHeader stage={stage} />
                     </AccordionTrigger>
                     
                     <AccordionContent className="p-2 border">
                        {vinculados && vinculados.users.length > 0 ? (
                           <ul className="grid grid-cols-1 text-sm gap-2">
                              {vinculados.users.map(user => (
                                 <li 
                                    key={user.id} 
                                    className="flex items-center justify-between gap-4"
                                 >
                                    <div className="flex items-center gap-2">
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

                                    <span className="text-slate-500 text-xs">
                                       {user.role?.descricao}
                                    </span>
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <p className="text-sm p-4 text-slate-500">
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