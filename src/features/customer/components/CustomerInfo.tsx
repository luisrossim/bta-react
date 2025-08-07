import { useNavigate } from "react-router-dom"
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyData } from "@/shared/components/EmptyData";
import { ListItem } from "@/shared/components/ListItem";
import { PatternFormat } from "react-number-format";
import { formatTimestamp } from "@/shared/utils/formatDate";
import { CustomerOrderCard } from "./CustomerOrderCard";
import { useGetCustomerQuery } from "../hooks/useCustomerApi";
import { LoadingIcon } from "@/shared/components/LoadingIcon";

interface CustomerInfoProps {
   customerId?: string
}

export function CustomerInfo({ customerId }: CustomerInfoProps) {
   const { data: customer, isFetching } = useGetCustomerQuery(customerId);
   const navigate = useNavigate();

   if(isFetching) return <LoadingIcon />

   if(!customer) return <EmptyData />

   return (
      <>
         <div className="grid grid-cols-1 gap-12 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
               <ListItem 
                  label="Nome" 
                  value={customer.nome}
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Telefone" 
                  className="bg-muted p-3 rounded-sm"
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
                  className="bg-muted p-3 rounded-sm"
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
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Descrição do endereço" 
                  value={customer.endereco.descricao} 
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Hectare" 
                  value={customer.endereco.hectare} 
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Loja x cliente (km)" 
                  value={customer.endereco.kmLojaCliente} 
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Coordenadas geográficas" 
                  className="bg-muted p-3 rounded-sm"
                  value={
                     customer.endereco.coordenadasGeograficas && (
                        <a 
                           href={customer.endereco.coordenadasGeograficas} 
                           target="_blank" 
                           rel="noopener noreferrer"
                        >
                           <Button 
                              size="sm" 
                              variant="ghost" 
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
                  className="bg-muted p-3 rounded-sm row-span-2"
               />

               <ListItem 
                  label="Cadastrado em" 
                  value={formatTimestamp(customer.criadoEm)}
                  className="bg-muted p-3 rounded-sm"
               />

               <ListItem 
                  label="Atualizado em" 
                  value={formatTimestamp(customer.criadoEm)}
                  className="bg-muted p-3 rounded-sm"
               />
            </div>

            <ListItem 
               label="Histórico das ordens de serviço"
               value={
                  <div className="grid grid-cols-1 gap-4 mt-2">
                     {customer.ordemServico.length > 0 
                        ? customer.ordemServico.map(order => (
                           <CustomerOrderCard 
                              key={order.id} 
                              order={order} 
                           />
                        ))
                        : (
                           <p className="font-light text-muted-foreground">
                              Nenhum registro encontrado
                           </p>
                        )
                  }
                  </div>
               }
            />
         </div>

         <div className="flex gap-4 items-center mt-20">
            <Button onClick={() => navigate(`/sistema/clientes/form/${customer.id}`)}>
               Editar informações
            </Button>

            <Button 
               variant={'outline'} 
               onClick={() => navigate(-1)}
            >
               Voltar
            </Button>
         </div>
      </>
   )
}
