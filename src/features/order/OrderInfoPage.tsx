import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/features/order/hooks/useOrderInfo";
import { EmptyData } from "@/components/EmptyData";
import { AssignUserForm } from "./components/AssignUserForm";
import { PageTitle } from "@/components/PageHeader";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PatternFormat } from "react-number-format";
import { calculateExecutionTime } from "./utils/calculateExecutionTime";
import { Badge } from "@/components/ui/badge";
import { ListItem } from "@/shared/components/ListItem";
import { CommentsForm } from "./components/CommentsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Attachment } from "./components/Attachment";
import { HistoryAccordion } from "./components/HistoryAccordion";
import { StagesFormHandler } from "./components/StagesFormHandler";
import { DisassociateForm } from "../stages/components/DisassociateForm";
import { formatTimestamp } from "@/shared/utils/formatDate";

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
      saveMeasurement,
      saveAssistance,
      disableActions
   } = useOrderInfo();

   const handleViewAttachment = async (attachmentId: string) => {
      const attachment = await viewAttachment(attachmentId);

      if(attachment) {
         window.open(attachment.url_temporaria, '_blank');
      }
   }

   if(!historicoAtual || !order?.cliente) return <EmptyData />

   return (
      <div className="space-y-14 mb-14">
         <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="space-y-1">
               <PageTitle 
                  title={historicoAtual.etapa.descricao} 
               />

               <div>
                  <p className="text-sm text-muted-foreground">
                     Tempo de execução: {calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
               <StagesFormHandler 
                  order={order} 
                  stage={historicoAtual.etapa.descricao}
                  onSubmitMeasurement={saveMeasurement}
                  onSubmitAssistance={saveAssistance}
               />

               {!historicoAtual.concluidoEm ? (
                     <ConfirmDialog
                        onConfirm={concluir}
                        title="Concluir etapa?"
                        trigger={
                           <Button>
                              <CheckCircle />Concluir
                           </Button>
                        }
                     />
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

         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <ListItem
               className="bg-slate-50 p-4 rounded-[6px]"
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
               className="bg-slate-50 p-4 rounded-[6px]"
               label="Técnicos atribuídos"
               value={(
                  <>
                     {historicoAtual.atribuicoes.length > 0 &&
                     historicoAtual.atribuicoes?.map(
                        ({ usuario }, index) => (
                           <div className="flex items-center gap-2">
                              <DisassociateForm
                                 key={index}
                                 title="Desatribuir usuário?"
                                 stage={historicoAtual.etapa} 
                                 user={usuario}
                                 onSubmit={() => desatribuir(usuario.id)}
                                 disableActions={disableActions}
                              />
                              <span className="font-medium">
                                 {usuario.nome}
                              </span> 
                           </div>

                        )
                     )}

                     <AssignUserForm 
                        stageUsers={historicoAtual.etapa.etapaUsuario}
                        onAtribuir={atribuir} 
                     />
                  </>
               )}
            />

            <ListItem
               className="bg-slate-50 p-4 rounded-[6px]"
               label="Situação"
               value={(
                  <div>
                     {historicoAtual.concluidoEm 
                        ? <Badge variant={"success"}>Concluída</Badge> 
                        : <Badge variant={"warning"}>Em andamento</Badge>
                     }
                  </div>
               )}
            />

            <ListItem
               className="bg-slate-50 p-4 rounded-[6px]"
               label="Iniciada em"
               value={formatTimestamp(historicoAtual.criadoEm)}
            />

            <ListItem 
               className="bg-slate-50 p-4 rounded-[6px]"
               label="Concluída em"
               value={formatTimestamp(historicoAtual.concluidoEm)}
            />

            <ListItem
               className="bg-slate-50 p-4 rounded-[6px]"
               label="Concluída por"
               value={historicoAtual.concluidoPor?.nome}
            />
         </div>

         <Tabs defaultValue="anexos">
            <TabsList className="mb-2">
               <TabsTrigger value="anexos">Anexos</TabsTrigger>
               <TabsTrigger value="history">Histórico</TabsTrigger>
               <TabsTrigger value="comments">Observações</TabsTrigger>
            </TabsList>

            <TabsContent value="anexos">
               <Attachment
                  attachments={order.anexos ?? []}
                  onUpload={uploadFile}
                  onRequestView={handleViewAttachment}
                  disableActions={disableActions}
               />
            </TabsContent>
            
            <TabsContent value="history">
               <HistoryAccordion
                  order={order}
                  orderHistory={historicoPassados} 
               />
            </TabsContent>

            <TabsContent value="comments">
               <CommentsForm
                  key={historicoAtual.id} 
                  observacoes={historicoAtual.observacoes}
                  onSubmit={comments} 
               />
            </TabsContent>
         </Tabs>
      </div>
   )
}