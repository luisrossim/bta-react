import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, type PreviousUrl } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import type { Customer } from "@/models/customer";
import { customerService } from "@/services/customer-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { UtilsService } from "@/utils/services/utils-service";
import { Edit } from "lucide-react";

export default function CustomerInfoPage() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [customer, setCustomer] = useState<Customer>()
   const [loading, setLoading] = useState<boolean>(false);


   useEffect(() => {
      if (id) fetchCustomer()
   }, [id]);


   const fetchCustomer = async () => {
      setLoading(true);

      try {
         const _customer: Customer = await customerService.getById(id!);
         setCustomer(_customer);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
         navigate("/sistema/clientes")
      } finally {
         setLoading(false);
      }
   }


   const previous: PreviousUrl[] = [
      {
         label: 'Clientes',
         redirectTo: '/sistema/clientes'
      }
   ]

   return (
      <div>
         <Breadcrumb current="Informações" previous={previous} />
         <PageTitle title="Informações do cliente" />
         <PageSubtitle subtitle="Visualize os dados do cliente, incluindo endereço e ordens de serviços vinculadas." />

         {customer && (
            <>
              <div className="grid grid-cols-1 gap-4 my-10">
                  <div>
                     <div className="flex flex-wrap justify-between items-center gap-2 bg-primary">
                        <h2 className="font-medium text-white px-2 py-1">Cliente</h2>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Link to={`/sistema/clientes/form/${customer.id}`} className="p-2"> 
                                 <Edit size={16} className="text-white" />
                              </Link>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Editar</p>
                           </TooltipContent>
                        </Tooltip>
                     </div>

                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 p-4 border bg-neutral-50">
                        <LabelInfo label="Nome" info={customer.nome} />
                        <LabelInfo label="Telefone" info={customer.telefone} />
                        <LabelInfo label="CPF" info={customer.cpf} />
                        <LabelInfo label="Cidade" info={customer.endereco.cidade} />
                        <LabelInfo label="Estado" info={customer.endereco.estado} />
                        <LabelInfo label="Hectare" info={customer.endereco.hectare} />
                        <LabelInfo label="Loja x cliente (km)" info={customer.endereco.kmLojaCliente} />
                        <LabelInfo label="Coordenadas" info={customer.endereco.coordenadasGeograficas} />
                        <LabelInfo label="Referência" info={customer.endereco.referencia} />
                        <span></span>
                        <LabelInfo label="Criado em" info={UtilsService.formatDate(customer.criadoEm)} />
                        <LabelInfo label="Atualizado em" info={UtilsService.formatDate(customer.atualizadoEm)} />
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <h2 className="font-medium text-white px-2 py-1 bg-neutral-600">Ordens de serviço</h2>
                  <div className="grid grid-cols-1 gap-2 px-2 py-2 border bg-neutral-50">
                     {customer.ordemServico.map((order) => (
                        <Link
                           to={`/sistema/ordens/info/${order.id}`} 
                           className="flex flex-wrap justify-between text-sm gap-2 px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                        >
                           <p>{order.id}</p>
                           <p className="font-medium">
                              {UtilsService.formatDate(order.criadoEm)}
                           </p>
                        </Link>
                     ))}
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

const LabelInfo = ({ label, info }: { label: string, info: any  }) => {
   return (
      <div className="flex flex-wrap items-center gap-2">
         <p className="font-medium text-neutral-900">{label}:</p>
         <p className="text-neutral-700">{info || '-'}</p>
      </div>
   )
}