import { Breadcrumb, type PreviousUrl } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { AlignRight, ArrowRight, Check, File, Link2, Link2Off, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderInfo } from "@/pages/order/hooks/use-order-info";
import { EmptyData } from "@/components/empty-data";
import type { ReactNode } from "react";
import type { User } from "@/models/user";
import type { AtribuirForm } from "@/models/service-order-history";
import { UtilsService } from "@/utils/services/utils-service";

export default function ServiceOrderInfoPage() {
   const {
      id,
      order,
      historicoAtual,
      historicoPassados,
      loading,
      form,
      atribuir,
      desatribuir,
      concluir,
      avancar
   } = useOrderInfo()


   const previous: PreviousUrl[] = [
      {
         label: 'Ordens de serviço',
         redirectTo: '/sistema/ordens'
      }
   ]

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
      const data: AtribuirForm = {
         historyId: historicoAtual!.id,
         userId
      }

      desatribuir(data);
   }

   if(!historicoAtual || !order?.cliente) return <EmptyData />

   return (
      <>
         <Breadcrumb current={`${id}`} previous={previous} />
         
         <div className="flex flex-col lg:flex-row justify-between gap-6">
            <h1 className="font-semibold text-4xl">
               {historicoAtual.etapa.descricao}
            </h1>

            <div className="flex items-center gap-4">
               <Button variant={"light"}>
                  <UserRoundCheck />Atribuir
               </Button>

               <Button variant={"success"} onClick={concluir}>
                  <Check />Concluir
               </Button>

               <Button onClick={avancar}>
                  <ArrowRight />Avançar
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
            <section>
               <h2 className="font-medium text-neutral-500 text-sm">Cliente</h2>
               <div className="flex items-center gap-2">
                  <p className="font-semibold">{order.cliente.nome}</p>
                  <Button variant={"ghost"} size={"icon"}>
                     <AlignRight />
                  </Button>
               </div>
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

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
            <section>
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Técnicos atribuídos</h2>

               {historicoAtual.atribuicoes.length > 0 
                  ? historicoAtual.atribuicoes?.map(
                     (atribuicao, index) => userElement(atribuicao.usuario, index)
                  ) : <span className="text-sm text-neutral-600">Nenhum usuário atribuído</span> 
               }
            </section>

            <section>
               <h2 className="font-medium text-neutral-500 text-sm mb-2">Informações</h2>

               <div className="mb-1">
                  <span>Iniciada em: </span> 
                  {UtilsService.formatDate(historicoAtual.criadoEm)}
               </div>
               <div>
                  <span>Concluída em: </span>
                  {historicoAtual.concluidoEm 
                     ? UtilsService.formatDate(historicoAtual.concluidoEm)
                     : "-"
                  }
               </div>
            </section>
         </div>

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
                              <b>Iniciada em:</b> {UtilsService.formatDate(item.criadoEm)}
                           </div>
                           <div>
                              <b>Concluída em: </b> 
                              {item.concluidoEm 
                                 ? UtilsService.formatDate(item.concluidoEm)
                                 : "-"
                              }
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </>
   )
}