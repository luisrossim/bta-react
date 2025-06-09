import { PageHeader } from "@/components/page-header";
import StageList from "./stage-list";

export default function StagePage() {
   return (
      <PageHeader 
         title="Etapas e vinculações" 
         subtitle="Vincule usuários específicos às etapas das ordens de serviço para que atuem conforme o fluxo definido." 
      >
         <StageList />
      </PageHeader>
   )
}