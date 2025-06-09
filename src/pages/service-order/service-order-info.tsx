import { Breadcrumb } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import type { ServiceOrder } from "@/models/service-order";
import { serviceOrderService } from "@/services/service-order-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ServiceOrderInfoPage() {
   const { id } = useParams();
   const [order, setOrder] = useState<ServiceOrder | null>(null)
   const [loading, setLoading] = useState<boolean>(false)


   useEffect(() => {
      if(id) loadServiceOrderInfo();
   }, [id])


   const loadServiceOrderInfo = async () => {
      setLoading(true)

      try {
         const _order = await serviceOrderService.getById(id!);
         setOrder(_order);
      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
      } finally {
         setLoading(false)
      }
   }


   if(loading) return <LoadingWrapper />

   return (
      <>
         <Breadcrumb label="Ordens de serviço" redirectTo="/sistema/ordens" />
         <PageTitle title="Informações da ordem de serviço" />
         <PageSubtitle subtitle={`${id}`} />
         
         <div>
            {order && (
               <div>
                  <h1>Ordem de Serviço #{order.id}</h1>
                  <section>
                     <h2>Cliente</h2>
                     <div>Nome: {order.cliente.nome}</div>
                     <div>CPF: {order.cliente.cpf}</div>
                     <div>Telefone: {order.cliente.telefone}</div>
                     <div>Cidade: {order.cliente.endereco.cidade} - {order.cliente.endereco.estado}</div>
                  </section>
                  <section>
                     <h2>Informações Gerais</h2>
                     <div>Problema: {order.problema || "-"}</div>
                     <div>Quantidade de Setores: {order.quantidadeSetores}</div>
                     <div>Observações: {order.observacoes || "-"}</div>
                     <div>Criado em: {new Date(order.criadoEm).toLocaleString()}</div>
                  </section>
                  <h2>Histórico</h2>
                  {order.historicoOs.map((hist) => (
                     <section
                        key={hist.id}
                        style={{
                           border: "1px solid #ccc",
                           borderRadius: 8,
                           margin: "16px 0",
                           padding: 16,
                           background: "#fafafa"
                        }}
                     >
                        <h3>{hist.etapa.descricao}</h3>
                        <div><b>Iniciada em:</b> {new Date(hist.criadoEm).toLocaleString()}</div>
                        <div><b>Concluída em:</b> {hist.concluidoEm ? new Date(hist.concluidoEm).toLocaleString() : "-"}</div>
                        <div><b>Observações:</b> {hist.observacoes || "-"}</div>
                        <div>
                           <b>Atribuídos:</b>{" "}
                           {hist.atribuicoes && hist.atribuicoes.length > 0
                              ? hist.atribuicoes.map((a: any) => a.usuario.nome).join(", ")
                              : "-"}
                        </div>
                     </section>
                  ))}
               </div>
            )}
         </div>
      </>
   )
}