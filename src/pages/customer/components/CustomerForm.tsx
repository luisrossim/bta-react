import { createCustomerSchema, type CreateCustomer } from "@/models/customer";
import { InputFormItem } from "@/shared/components/InputFormItem";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface CustomerFormProps {
   id?: string
}

export default function CustomerForm({ id }: CustomerFormProps){
   const { fetchCustomerById, saveCustomer } = useCustomerForm();

   const form = useForm<CreateCustomer>({
      resolver: zodResolver(createCustomerSchema),
      defaultValues: {
         endereco: {
            cidade: "Nova Venécia",
            estado: "ES"
         }
      }
   })

   const onSubmit = (data: CreateCustomer) => {
      const customerId = id ? Number(id) : null;
      saveCustomer(customerId, data);
   };
   

   const handeFetchCustomer = async (id: string) => {
      const user = await fetchCustomerById(id);
      if(user) {
         form.reset(user);
      }
   }

   useEffect(() => {
      if (id) handeFetchCustomer(id)
   }, [id]);


   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <InputFormItem 
                  label="Nome"
                  name="nome"
               />

               <InputFormItem 
                  label="Telefone"
                  name="telefone"
                  maskFormat="(##) #####-####"
                  maskPlaceholder="(99) 99999-9999"
               />

               <InputFormItem 
                  label="CPF"
                  name="cpf"
                  maskFormat="###.###.###-##"
                  maskPlaceholder="999.999.999-99"
               />

               <InputFormItem 
                  label="Cidade"
                  name="endereco.cidade"
               />

               <InputFormItem 
                  label="Estado"
                  name="endereco.estado"
               />

               <InputFormItem 
                  label="Hectare"
                  name="endereco.hectare"
                  type="number"
               />

               <InputFormItem 
                  label="Coordenadas"
                  name="endereco.coordenadasGeograficas"
                  placeholder="https://maps.app.goo.gl/yc9B8mFg6T8zUJTz8"
               />

               <InputFormItem 
                  label="Loja x cliente"
                  name="endereco.kmLojaCliente"
                  type="number"
               />

               <InputFormItem 
                  label="Referência"
                  name="endereco.referencia"
               />
            </div>

            <div className="flex items-center gap-4 my-10 justify-end">
               <Link to={"/sistema/clientes"}>
                  <Button className="px-8" variant={"outline"}>
                     Cancelar
                  </Button>
               </Link>

               <Button type="submit" className="!px-12">
                  <Check /> { id ? "Editar" : "Cadastrar" }
               </Button>
            </div>
         </form>
      </FormProvider>
   )
}
