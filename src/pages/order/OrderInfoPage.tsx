import { ArrowRight, Check, File, Link, Link2Off } from "lucide-react";
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
import { ListItem } from "@/shared/components/ListItem";
import { StageHeader } from "../stages/components/StageHeader";
import { HistoryCommentsForm } from "./components/HistoryCommentsForm";

export default function OrderInfoPage() {
   const {
      order,
      historicoAtual,
      historicoPassados,
      atribuir,
      desatribuir,
      concluir,
      avancar,
      comments,
      viewAttachment,
      uploadFile,
      disableActions
   } = useOrderInfo();

   const handleViewAttachment = async (anexoId: string) => {
      const attachment = await viewAttachment(anexoId);

      if(attachment) {
         window.open(attachment.url_temporaria, '_blank');
      }
   }

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
               <PageTitle 
                  title={historicoAtual.etapa.descricao} 
               />

               <PageSubtitle 
                  subtitle={`Tempo de execução: ${calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}`} />

               {historicoAtual.concluidoEm 
                  ? <Badge variant={"success"}>Concluída</Badge> 
                  : <Badge variant={"warning"}>Em andamento</Badge>
               }
            </div>

            <div className="flex items-center gap-4 flex-wrap">
               {!historicoAtual.concluidoEm ? (
                  <>
                     <HistoryCommentsForm
                        onSubmit={comments}
                     />

                     <AssignUserForm 
                        stageUsers={historicoAtual.etapa.etapaUsuario}
                        onAtribuir={atribuir}
                     />
                     
                     <ConfirmDialog
                        onConfirm={concluir}
                        title="Concluir etapa?"
                        trigger={
                           <Button>
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

         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <ListItem 
               label="Cliente"
               value={(
                  <div className="flex flex-col gap-1">
                     {order.cliente.nome}

                     <PatternFormat 
                        format="(##) #####-####" 
                        displayType="text" 
                        value={order.cliente.telefone} 
                     />
                  </div>
               )}
            />

            <ListItem
               label="Técnicos atribuídos"
               value={(
                  <>
                     {historicoAtual.atribuicoes.length > 0 && historicoAtual.atribuicoes?.map(
                        (atribuicao, index) => userElement(atribuicao.usuario, index)
                     )}
                  </>
               )}
            />

            <ListItem 
               label="Iniciada em"
               value={UtilsService.formatTimestamp(historicoAtual.criadoEm)}
            />

            <ListItem 
               label="Concluída em"
               value={UtilsService.formatTimestamp(historicoAtual.concluidoEm)}
            />

            <ListItem 
               label="Concluída Por"
               value={historicoAtual.concluidoPor?.nome}
            />

            <ListItem 
               label="Observações"
               value={historicoAtual.observacoes}
            />

            <ListItem 
               label="Anexos"
               className="col-span-1"
               value={(
                  <div className="grid grid-cols-1 gap-4">
                     <UploadFile 
                        orderId={order.id} 
                        uploadFn={uploadFile}   
                        disableActions={disableActions}
                     />

                     <div className="grid grid-cols-1 gap-2">
                        {order.anexos?.map((attachment, index) => (
                           <Button
                              key={index}
                              onClick={() => handleViewAttachment(attachment.id)}
                              variant={"link"}
                              className="flex justify-start text-start"
                              size={"sm"}
                           >
                              <File /> 
                              <span className="truncate max-w-full">{attachment.descricao}</span>
                           </Button>
                        ))}
                     </div>
                  </div>
               )}
            />
         </div>

         <section>
            <div className="mb-12">
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Histórico geral</h2>

               {!historicoPassados || historicoPassados.length === 0 && (
                  <EmptyData />
               )} 

               {historicoPassados.map((item, index) => (
                  <Accordion 
                     key={index} 
                     type="single" 
                     collapsible 
                     className="mb-2"
                  >
                     <AccordionItem value={item.etapa.descricao}>
                        <AccordionTrigger className="rounded-none cursor-pointer hover:no-underline bg-primary/5 p-4">
                           <StageHeader stage={item.etapa} />
                        </AccordionTrigger>
                        
                        <AccordionContent className="border-t grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 p-4 lg:p-6 bg-primary/2">
                           <ListItem className="lg:col-span-3 xl:col-span-4" label="Observações" value={item.observacoes} />

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
            </div>
         </section>
      </div>
   )
}