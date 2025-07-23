import { ArrowRight, CheckCircle, Link, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/pages/order/hooks/useOrderInfo";
import { EmptyData } from "@/components/empty-data";
import type { ReactNode } from "react";
import type { User } from "@/models/user";
import { UtilsService } from "@/utils/services/utils-service";
import { AssignUserForm } from "./components/AssignUserForm";
import { PageTitle } from "@/components/page-header";
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

               <div>
                  <p className="text-sm text-muted-foreground">
                     Tempo de execução: {calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
               {!historicoAtual.concluidoEm ? (
                  <>
                     <StagesFormHandler 
                        order={order} 
                        stage={historicoAtual.etapa.descricao}
                        onSubmitMeasurement={saveMeasurement}
                        onSubmitAssistance={saveAssistance}
                     />
                     
                     <ConfirmDialog
                        onConfirm={concluir}
                        title="Concluir etapa?"
                        trigger={
                           <Button>
                              <CheckCircle />Concluir
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

                     <AssignUserForm 
                        stageUsers={historicoAtual.etapa.etapaUsuario}
                        onAtribuir={atribuir} 
                     />
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
               label="Concluída por"
               value={historicoAtual.concluidoPor?.nome}
            />
         </div>

         <Tabs defaultValue="anexos">
            <TabsList>
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