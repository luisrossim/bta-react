import { PageHeader } from "@/components/page-header";
import type { Customer } from "@/models/customer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UtilsService } from "@/utils/services/utils-service";
import { ChevronLeft, Edit, MapPin } from "lucide-react";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { Button } from "@/components/ui/button";
import { EmptyData } from "@/components/empty-data";
import { ListItem } from "@/shared/components/ListItem";
import { PatternFormat } from "react-number-format";
import { CustomerOrderCard } from "./components/CustomerOrderCard";

export default function CustomerInfoPage() {
   const { id } = useParams();
   const [customer, setCustomer] = useState<Customer>();
   const navigate = useNavigate();
   const { fetchCustomerById } = useCustomerForm();

   const handleFetchCustomer = async (id: string) => {
      const _customer = await fetchCustomerById(id);
      setCustomer(_customer);
   }

   useEffect(() => {
      if (id) handleFetchCustomer(id)
   }, [id]);

   if(!customer) return <EmptyData />

   return (
      <div className="space-y-6">
         <Button 
            variant={"outline"} 
            size={"icon"} 
            onClick={() => navigate("/sistema/clientes")}
         >
            <ChevronLeft />
         </Button>

         <PageHeader 
            title="Informações do cliente"
            subtitle="Visualize os dados do cliente, incluindo endereço e ordens de serviços vinculadas."
            action={
               <Button onClick={() => navigate(`/sistema/clientes/form/${customer.id}`)}>
                  <Edit /> Editar
               </Button>
            }
         />

         <div className="grid grid-cols-1 gap-14 my-10">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
               <ListItem label="Nome" value={customer.nome} />

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
               <ListItem label="Hectare" value={customer.endereco.hectare} />
               <ListItem label="Loja x cliente (km)" value={customer.endereco.kmLojaCliente} />

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
                              <MapPin /> Visualizar
                           </Button>
                        </a>
                     )
                  }
               />

               <ListItem label="Referência" value={customer.endereco.referencia} />
               <ListItem label="Criado em" value={UtilsService.formatTimestamp(customer.criadoEm)} />
               <ListItem label="Atualizado em" value={UtilsService.formatTimestamp(customer.atualizadoEm)} />
            </div>

            <div>
               <h2 className="mb-2 text-neutral-500 font-medium text-sm">Ordens de serviço</h2>
               <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {customer.ordemServico.length > 0 && customer.ordemServico.map((order) => (
                     <CustomerOrderCard key={order.id} order={order} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
