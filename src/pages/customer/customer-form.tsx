import { customerFormSchema, type Customer, type CustomerForm} from "@/models/customer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastService } from "@/utils/services/toast-service";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { PageSubtitle, PageTitle } from "@/components/page-header";
import { Breadcrumb, type PreviousUrl } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { customerService } from "@/services/customer-service";
import { toast } from "sonner";


export default function CustomerFormPage(){
   const { id } = useParams();
   const [loading, setLoading] = useState<boolean>(false);
   const navigate = useNavigate();
   const { register, handleSubmit, reset, formState:{ errors } } = useForm<CustomerForm>({
      resolver: zodResolver(customerFormSchema),
      defaultValues: {
         endereco: {
            cidade: "Nova Venécia",
            estado: "ES"
         }
      }
   })


   useEffect(() => {
      if (id) fetchCustomer();
   }, [id]);


   const fetchCustomer = async () => {
      setLoading(true);

      try {
         const customer: Customer = await customerService.getById(id!);
         reset(customer);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
         navigate("/sistema/clientes")
      } finally {
         setLoading(false);
      }
   }

   const handleSaveCustomer = async (data: CustomerForm) => {
      const toastId = toast.loading("Salvando cliente");
      
      try {
         if(id)
            await customerService.update(id, data);
         else 
            await customerService.create(data);
         
         toast.success("Cliente salvo com sucesso", { id: toastId });
         navigate("/sistema/clientes");

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      }
   }


   const previous: PreviousUrl[] = [
      {
         label: 'Clientes',
         redirectTo: '/sistema/clientes'
      }
   ]


   const titleText = id 
      ? "Editar informações do cliente" 
      : "Cadastrar novo cliente";

   const subTitleText = id 
      ? "Altere as informações do cliente existente" 
      : "Preencha as informações do cliente";


   return (
      <div>
         <Breadcrumb current="Cadastrar" previous={previous}/>
         <PageTitle title={titleText} />
         <PageSubtitle subtitle={subTitleText} />

         <form onSubmit={handleSubmit(handleSaveCustomer)} className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <FormFieldWrapper colSpan={2}>
                  <Label htmlFor="nome">Nome</Label>
                  <Input 
                     id="nome" 
                     className={`${errors.nome && "border-red-500"}`}
                     {...register("nome")} 
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="telefone">Telefone</Label>
                  
                  <Input 
                     id="telefone"
                     className={`${errors.telefone && "border-red-500"}`}
                     {...register("telefone")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                     id="cpf"
                     disabled={id ? true : false}
                     className={`${errors.cpf && "border-red-500"}`}
                     {...register("cpf")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                     id="cidade"
                     type="text"
                     className={`${errors.endereco?.cidade && "border-red-500"}`}
                     {...register("endereco.cidade")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                     id="estado"
                     type="text"
                     className={`${errors.endereco?.estado && "border-red-500"}`}
                     {...register("endereco.estado")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="hectare">Hectare</Label>
                  <Input
                     id="hectare"
                     type="number"
                     {...register("endereco.hectare")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="coordenadasGeograficas">Coordenadas Geográficas</Label>
                  <Input
                     id="coordenadasGeograficas"
                     type="text"
                     {...register("endereco.coordenadasGeograficas")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="kmLojaCliente">Loja x cliente (km)</Label>
                  <Input
                     id="kmLojaCliente"
                     type="number"
                     {...register("endereco.kmLojaCliente")}
                  />
               </FormFieldWrapper>

                <FormFieldWrapper>
                  <Label htmlFor="referencia">Referência</Label>
                  <Input
                     id="referencia"
                     type="text"
                     {...register("endereco.referencia")}
                  />
               </FormFieldWrapper>
            </div>

            <Button type="submit" className="my-6 float-end">
               <Check /> {id ? "Editar" : "Cadastrar"}
            </Button>
         </form>
      </div>
   )
}
