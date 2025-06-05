import { PageSubtitle, PageTitle } from "@/components/page-title";
import StageList from "./stage-list";

export default function StagePage() {
   return (
      <div>
         <PageTitle title="Etapas e vinculações" />
         <PageSubtitle subtitle="Vincule usuários específicos às etapas das ordens de serviço para que atuem conforme o fluxo definido." />

         <StageList />
      </div>
   )
}