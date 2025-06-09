import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, type PreviousUrl } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import type { Customer } from "@/models/customer";
import { customerService } from "@/services/customer-service";
import { ToastService } from "@/utils/services/toast-service";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import userIcon from "@/assets/images/user-info.svg"
import { UtilsService } from "@/utils/services/utils-service";
import { Edit2 } from "lucide-react";

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


   if(loading) return <LoadingWrapper />

   return (
      <div>
         <Breadcrumb current="Informações" previous={previous} />
         <PageTitle title="Informações do cliente" />
         <PageSubtitle subtitle="Visualize os dados do cliente, incluindo endereço e ordens de serviços vinculadas." />

         {customer && (
            <>
               <div className="grid grid-cols-1 gap-4 my-8 bg-slate-50 border">
                  <div className="flex justify-between items-center gap-2 bg-slate-100 px-6 py-4">
                     <img src={userIcon} className="w-[28px]" />
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Link to={`/sistema/clientes/form/${customer.id}`} className="p-2"> 
                              <Edit2 size={16} className="text-slate-600" />
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Editar</p>
                        </TooltipContent>
                     </Tooltip>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-6 py-4">
                     <LabelInfo label="Nome" info={customer.nome} />
                     <LabelInfo label="Telefone" info={customer.telefone} />
                     <LabelInfo label="CPF" info={customer.cpf} />
                     <LabelInfo label="Cidade" info={customer.endereco.cidade} />
                     <LabelInfo label="Estado" info={customer.endereco.estado} />
                     <LabelInfo label="Hectare" info={customer.endereco.hectare} />
                     <LabelInfo label="Loja x cliente (km)" info={customer.endereco.kmLojaCliente} />
                     <LabelInfo label="Coordenadas" info={customer.endereco.coordenadasGeograficas} />
                     <LabelInfo label="Referência" info={customer.endereco.referencia} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 border-t gap-2 px-6 py-4">
                     <LabelInfo label="Criado em" info={UtilsService.formatDate(customer.criadoEm)} />
                     <LabelInfo label="Atualizado em" info={UtilsService.formatDate(customer.atualizadoEm)} />
                  </div>
               </div>

               <div className="bg-slate-50 border px-6 py-4 mb-4">
                  <h2 className="font-medium text-slate-500 text-sm">Ordens de serviço</h2>
               </div>
            </>
         )}
      </div>
   )
}

const LabelInfo = ({ label, info }: { label: string, info: any  }) => {
   return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
         <p className="font-medium text-slate-500">{label}:</p>
         <p className="text-blue-700">{info || '-'}</p>
      </div>
   )
}