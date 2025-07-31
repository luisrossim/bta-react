import { ArrowRight, CheckCircle, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/features/order/hooks/useOrderInfo";
import { EmptyData } from "@/shared/components/EmptyData";
import { PageTitle } from "@/shared/components/PageHeader";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PatternFormat } from "react-number-format";
import { Badge } from "@/components/ui/badge";
import { ListItem } from "@/shared/components/ListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimestamp } from "@/shared/utils/formatDate";
import { useCalculateExecutionTime } from "../hooks/useCalculateExecutionTime";
import { DisassociateForm } from "@/features/stages/components/DisassociateForm";
import { AssignUserForm } from "../components/AssignUserForm";
import { Attachment } from "../components/Attachment";
import { CommentsForm } from "../components/CommentsForm";
import { OrderHistoryAccordion } from "../components/OrderHistoryAccordion";
import { OrderSheets } from "../components/OrderSheets";
import { Link } from "react-router-dom";

export default function ViewOrder() {
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

   const { calculateExecutionTime } = useCalculateExecutionTime();

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
            <div>
               <PageTitle title={historicoAtual.etapa.descricao} />
               <Link 
                  to={`/sistema/clientes/${order.cliente.id}`} 
                  className="flex flex-col gap-1 text-sm text-primary mt-2"
               >
                  <div className="flex items-center gap-2">
                     <User size={16} />
                     <p>{order.cliente.nome}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Phone size={16} />
                     <PatternFormat 
                        format="(##) #####-####" 
                        displayType="text" 
                        value={order.cliente.telefone} 
                     />
                  </div>
               </Link>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
               <OrderSheets
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

         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8">
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
               label="Iniciada em"
               value={formatTimestamp(historicoAtual.criadoEm)}
            />

            <ListItem 
               label="Concluída em"
               value={formatTimestamp(historicoAtual.concluidoEm)}
            />

            <ListItem
               label="Concluída por"
               value={historicoAtual.concluidoPor?.nome}
            />

            <ListItem 
               label="Tempo de execução"
               value={calculateExecutionTime(historicoAtual.criadoEm, historicoAtual.concluidoEm!)}
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
               <OrderHistoryAccordion
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