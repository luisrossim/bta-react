import { PageSubtitle, PageTitle } from "@/components/page-header";
import { AssociatedForm } from "./components/AssociatedForm";
import { AssociatedList } from "./components/AssociatedList";
import { useStageAssociate } from "./hooks/useStageAssociate";
import type { AssociateForm } from "@/models/stage";

export default function StagePage() {
   const {
      stages,
      associated,
      associate,
      disassociate,
      stageOptions,
      userOptions,
      disableActions
   } = useStageAssociate();

   const handleAssociateUser = (data: AssociateForm) => {
      associate(data);
   }

   const handleDisassociateUser = (stageId: number, userId: number) => {
      disassociate(stageId, userId);
   }

   return (
      <div className="space-y-14">
         <div className="flex flex-wrap justify-between items-center gap-8">
            <div>
               <PageTitle 
                  title="Etapas e vinculações" 
               />
               <PageSubtitle 
                  subtitle="Vincule usuários específicos às etapas das ordens de serviço para que atuem conforme o fluxo definido." 
               />
            </div>
            <AssociatedForm 
               onAssociate={handleAssociateUser}
               stageOptions={stageOptions}
               userOptions={userOptions}
               disableActions={disableActions}
            />
         </div>

         <AssociatedList
            stages={stages} 
            associated={associated}
            onDisassociate={handleDisassociateUser}
            disableActions={disableActions}
         />
      </div>
   )
}