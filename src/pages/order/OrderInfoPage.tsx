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
import { UploadFile } from "./components/UploadFile";
import { ListItem } from "@/shared/components/ListItem";
import { OrderHistoryAccordion } from "./components/OrderHistoryAccordion";
import { AssistanceForm } from "./components/AssistanceForm";
import { MeasurementForm } from "./components/MeasurementForm";
import { CommentsHistoryForm } from "./components/CommentsHistoryForm";

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
      saveMeasurementForm,
      saveAssistanceForm,
      disableActions
   } = useOrderInfo();

   const etapaDescricao = historicoAtual?.etapa.descricao;

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
                     {etapaDescricao == "Medição" && (
                        <MeasurementForm order={order} onSubmit={saveMeasurementForm} />
                     )}

                     {etapaDescricao == "Assistência" && (
                        <AssistanceForm order={order} onSubmit={saveAssistanceForm} />
                     )}

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

         <CommentsHistoryForm
            key={historicoAtual.id} 
            observacoes={historicoAtual.observacoes}
            onSubmit={comments} 
         />

         <section>
            <div className="mb-12">
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Histórico geral</h2>
               
               <OrderHistoryAccordion 
                  order={order}
                  orderHistory={historicoPassados} 
               />
            </div>
         </section>
      </div>
   )
}