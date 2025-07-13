import { EmptyData } from "@/components/empty-data";
import { DisassociateForm } from "./DisassociateForm";
import { StageHeader } from "./StageHeader";
import type { AssociatedUsers, Stage } from "@/models/stage";

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
         {stages.map(stage => {
            const vinculados = associated.find(a => a.stageId === stage.id);

            return (
               <div key={stage.id} className="rounded-[8px] shadow-md overflow-hidden">
                  <StageHeader stage={stage} />

                  {vinculados && vinculados.users.length > 0 ? (
                     <ul className="text-sm p-2">
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

                              <span className="text-neutral-500">
                                 {user.role?.descricao}
                              </span>
                           </li>
                        ))}
                     </ul>
                  ) : (
                     <p className="text-sm p-5 text-neutral-500">
                        Nenhum usuário vinculado
                     </p>
                  )}
               </div>
            );
         })}
      </div>
   )
}