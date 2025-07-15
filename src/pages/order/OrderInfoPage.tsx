import { ArrowRight, Check, Link, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/pages/order/hooks/useOrderInfo";
import { EmptyData } from "@/components/empty-data";
import type { ReactNode } from "react";
import type { User } from "@/models/user";
import { UtilsService } from "@/utils/services/utils-service";
import { AssignUserForm } from "./components/AssignUserForm";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PatternFormat } from "react-number-format";
import { calculateExecutionTime } from "./utils/calculateExecutionTime";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { UserAssignedTooltip } from "./components/UserAssignedTooltip";
import { UploadFile } from "./components/UploadFile";

export default function OrderInfoPage() {
   const {
      order,
      historicoAtual,
      historicoPassados,
      atribuir,
      desatribuir,
      concluir,
      avancar
   } = useOrderInfo();

   const userElement = (user: User, index: number): ReactNode => {
      return (
         <div key={index} className="flex items-center gap-2 p-1">
            <button
               type="button"
               onClick={() => desatribuir(user.id)} 
               className="group p-0 hover:cursor-pointer"
            >
               <span className="hidden group-hover:block">
                  <Link2Off size={18} className="text-red-600" />
               </span>
               <span className="block group-hover:hidden">
                  <Link size={18} className="text-primary" />
               </span>
            </button>
            <p className="font-medium">{user.nome}</p>
         </div>
      );
   };

   if(!historicoAtual || !order?.cliente) return <EmptyData />

   return (
      <div className="space-y-14">
         <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="space-y-1">
               <PageTitle title={historicoAtual.etapa.descricao} />

               <PageSubtitle subtitle={`Tempo de execução: ${calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}`} />

               {historicoAtual.concluidoEm 
                  ? <Badge variant={"success"}>Concluída</Badge> 
                  : <Badge variant={"warning"}>Em andamento</Badge>
               }
            </div>

            <div className="flex items-center gap-4">
               {!historicoAtual.concluidoEm ? (
                  <>
                     <AssignUserForm 
                        stageUsers={historicoAtual.etapa.etapaUsuario}
                        onAtribuir={atribuir}
                     />
                     
                     <ConfirmDialog
                        onConfirm={concluir}
                        title="Concluir etapa?"
                        trigger={
                           <Button size={"lg"}>
                              <Check />Concluir
                           </Button>
                        }
                     />
                  </>
               ) : (
                  <ConfirmDialog
                     onConfirm={avancar}
                     title="Avançar etapa?"
                     trigger={
                        <Button size={"lg"}>
                           <ArrowRight /> Avançar
                        </Button>
                     }
                  />
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section>
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Informações do cliente</h2>

               <div className="flex flex-col gap-1 font-medium">
                  <p>{order.cliente.nome}</p>

                  <PatternFormat 
                     format="(##) #####-####" 
                     displayType="text" 
                     value={order.cliente.telefone} 
                  />
               </div>
            </section>

            <section>
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Técnicos atribuídos</h2>

               {historicoAtual.atribuicoes.length > 0 
                  ? historicoAtual.atribuicoes?.map(
                     (atribuicao, index) => userElement(atribuicao.usuario, index)
                  ) : <span className="text-sm text-neutral-600">Nenhum usuário atribuído</span> 
               }
            </section>

            <section>
               <h2 className="font-medium text-neutral-500 text-sm">Anexos</h2>
               <UploadFile />
            </section>
            
            <section>
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Informações</h2>

               <div className="flex flex-col gap-1 font-medium">
                  <p>Iniciada em {UtilsService.formatTimestamp(historicoAtual.criadoEm)}</p> 

                  {historicoAtual.concluidoEm && (
                     <p>Concluída em {UtilsService.formatTimestamp(historicoAtual.concluidoEm)}</p>
                  )}
               </div>
            </section>
         </div>

         <section>
            <div className="mb-12">
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Histórico geral</h2>

               {historicoPassados.map((item, index) => (
                  <Accordion key={index} type="single" collapsible>
                     <AccordionItem value={item.etapa.descricao}>
                        <AccordionTrigger className="border-b rounded-none cursor-pointer hover:no-underline py-2">
                           <div className="flex gap-3 items-center text-primary font-medium">
                              <p className="flex items-center justify-center bg-primary text-white w-[28px] h-[28px] rounded-full">
                                 {item.etapa.id}
                              </p>
                              <p className="text-base">
                                 {item.etapa.descricao}
                              </p>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2  px-10 py-2">
                           <p>Iniciada em {UtilsService.formatTimestamp(item.criadoEm)}</p>
                           <p>Concluída em {UtilsService.formatTimestamp(item.concluidoEm)}</p>
                           <p className="mb-3">Observações: {item.observacoes}</p>
                           {item.atribuicoes?.map((atribuicao, index) => (
                              <UserAssignedTooltip 
                                 key={index} 
                                 userAssigned={atribuicao.usuario}
                                 fullName={true}
                              />
                           ))}
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               ))}
            </div>
         </section>
      </div>
   )
}