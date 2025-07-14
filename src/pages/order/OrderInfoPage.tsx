import { ArrowRight, Check, File, Link2, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/pages/order/hooks/useOrderInfo";
import { EmptyData } from "@/components/empty-data";
import type { ReactNode } from "react";
import type { User } from "@/models/user";
import type { CreateAtribuicao } from "@/models/service-order-history";
import { UtilsService } from "@/utils/services/utils-service";
import { AssignUserForm } from "./components/AssignUserForm";
import { PageHeader } from "@/components/page-header";

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
         <div key={index} className="flex items-center gap-2">
            <button
               type="button"
               onClick={() => removeUser(user.id)} 
               className="group p-0 hover:cursor-pointer"
            >
               <span className="hidden group-hover:block">
                  <Link2Off className="text-red-600" />
               </span>
               <span className="block group-hover:hidden">
                  <Link2 className="text-primary" />
               </span>
            </button>
            <p className="font-medium">{user.nome}</p>
         </div>
      );
   };


   const removeUser = (userId: number) => {
      const data: CreateAtribuicao = {
         historyId: historicoAtual!.id,
         userId
      }

      desatribuir(data);
   }

   if(!historicoAtual || !order?.cliente) return <EmptyData />

   return (
      <div className="space-y-14">
         <PageHeader 
            title={historicoAtual.etapa.descricao}
            subtitle={order.cliente.nome}
            action={
               <div className="flex items-center gap-4">
                  <AssignUserForm 
                     stageUsers={historicoAtual.etapa.etapaUsuario}
                     atribuir={atribuir}
                  />

                  <Button variant={"success"} size={"lg"} onClick={concluir}>
                     <Check />Concluir
                  </Button>

                  <Button onClick={avancar} size={"lg"}>
                     <ArrowRight />Avançar
                  </Button>
               </div>
            }
         />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex justify-center p-4 bg-neutral-100 w-full h-full"><File size={16} /></div>
                  <div className="flex justify-center p-4 bg-neutral-100 w-full h-full"><File size={16} /></div>
                  <div className="flex justify-center p-4 bg-neutral-100 w-full h-full"><File size={16} /></div>
               </div>
            </section>
         </div>

         <section>
            <h2 className="font-medium text-neutral-500 text-sm mb-2">Informações</h2>

            <div className="mb-1">
               <span>Iniciada em: </span> 
               {UtilsService.formatTimestamp(historicoAtual.criadoEm)}
            </div>
            <div>
               <span>Concluída em: </span>
               {historicoAtual.concluidoEm 
                  ? UtilsService.formatTimestamp(historicoAtual.concluidoEm)
                  : "-"
               }
            </div>
         </section>

         <section>
            <div className="mb-12">
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Histórico geral</h2>

               <div className="grid grid-cols-1 gap-4">
                  {historicoPassados.map((item) => (
                     <div key={item.id} className="bg-neutral-100 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-primary mb-3">
                           <span className="text-sm">{item.etapa.id}</span>
                           <h3 className="font-medium">{item.etapa.descricao}</h3>
                        </div>

                        <div>
                           <b>Atribuídos:</b>{" "}
                           {item.atribuicoes && item.atribuicoes.length > 0
                              ? item.atribuicoes.map((a: any) => a.usuario.nome).join(", ")
                              : "Nenhum técnico atribuído"}
                        </div>

                        <div>
                           <div>
                              <b>Iniciada em:</b> {UtilsService.formatTimestamp(item.criadoEm)}
                           </div>
                           <div>
                              <b>Concluída em: </b> 
                              {item.concluidoEm 
                                 ? UtilsService.formatTimestamp(item.concluidoEm)
                                 : "-"
                              }
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   )
}