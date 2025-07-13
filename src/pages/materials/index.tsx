import { PageSubtitle, PageTitle } from "@/components/page-header";
import { Cog } from "lucide-react";

export default function MaterialsPage(){
   return (
      <>
         <PageTitle title="Materiais" />
         <PageSubtitle subtitle="Gerencie e organize os materiais empregados nos serviços." />
         
         <div className="flex gap-2 items-center text-sm text-neutral-500">
            <Cog size={14} /> Em breve
         </div>
      </>
   )
}