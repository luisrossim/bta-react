import { PageHeader } from "@/shared/components/PageHeader";
import { useNavigate, useParams } from "react-router-dom"
import { Edit2, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyData } from "@/shared/components/EmptyData";
import { ListItem } from "@/shared/components/ListItem";
import { PatternFormat } from "react-number-format";
import { formatTimestamp } from "@/shared/utils/formatDate";
import { CustomerOrderCard } from "../components/CustomerOrderCard";
import { useGetCustomer } from "../hooks/useCustomerApi";

export default function ViewCustomer() {
   const { id } = useParams();
   const { data: customer } = useGetCustomer(id);
   const navigate = useNavigate();

   if(!customer) return <EmptyData />

   return (
      <div className="space-y-6">
         <PageHeader 
            title="Informações do cliente"
            subtitle="Visualize os dados do cliente, incluindo endereço e ordens de serviços vinculadas."
         />

         <div className="grid grid-cols-1 gap-14 my-10">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
               <ListItem 
                  label="Nome" 
                  value={customer.nome}
               />

               <ListItem 
                  label="Telefone" 
                  value={
                     <PatternFormat 
                        format="(##) #####-####" 
                        displayType="text" 
                        value={customer.telefone} 
                     />
                  } 
               />

               <ListItem 
                  label="CPF" 
                  value={
                     <PatternFormat 
                        format="###.###.###-##" 
                        displayType="text" 
                        value={customer.cpf} 
                     />
                  } 
               />

               <ListItem 
                  label="Endereço" 
                  value={`${customer.endereco.cidade} (${customer.endereco.estado})`} 
               />

               <ListItem 
                  label="Hectare" 
                  value={customer.endereco.hectare} 
               />

               <ListItem 
                  label="Loja x cliente (km)" 
                  value={customer.endereco.kmLojaCliente} 
               />

               <ListItem 
                  label="Coordenadas geográficas" 
                  value={
                     customer.endereco.coordenadasGeograficas && (
                        <a 
                           href={customer.endereco.coordenadasGeograficas} 
                           target="_blank" 
                           rel="noopener noreferrer"
                        >
                           <Button 
                              size="sm" 
                              variant="secondary" 
                              className="text-primary"
                           >
                              <MapPinned /> Visualizar
                           </Button>
                        </a>
                     )
                  }
               />

               <ListItem 
                  label="Referência" 
                  value={customer.endereco.referencia} 
               />
            </div>

            <div>
               <h2 className="mb-2 text-slate-500 font-medium text-sm">Ordens de serviço</h2>
               <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {customer.ordemServico.length > 0 && customer.ordemServico.map((order) => (
                     <CustomerOrderCard key={order.id} order={order} />
                  ))}
               </div>
            </div>

            <div className="text-sm space-y-1">
               <h2 className="text-slate-500 font-medium">Informações do registro</h2>
               <p>Criado em {formatTimestamp(customer.criadoEm)}</p>
               <p>Atualizado em {formatTimestamp(customer.atualizadoEm)}</p>
            </div>
         </div>

         <div className="flex justify-end gap-4 items-center">
            <Button 
               variant={'outline'} 
               onClick={() => navigate(-1)} 
               className="px-8"
            >
               Voltar
            </Button>
            <Button onClick={() => navigate(`/sistema/clientes/form/${customer.id}`)}>
               <Edit2 /> Editar
            </Button>
         </div>
      </div>
   )
}
