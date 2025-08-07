import { createCustomerSchema, type CreateCustomer } from "@/features/customer/types/Customer";
import { InputFormItem } from "@/shared/components/InputFormItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreateCustomerMutation, useGetCustomerQuery, useUpdateCustomerMutation } from "../hooks/useCustomerApi";
import { showError, showSuccess } from "@/shared/utils/showMessage";
import { MaskFormItem } from "@/shared/components/InputMasked";

interface CustomerFormProps {
   customerId?: string
}

export default function CustomerForm({ customerId }: CustomerFormProps){
   const { data: customer } = useGetCustomerQuery(customerId);
   const { mutateAsync: createCustomer } = useCreateCustomerMutation();
   const { mutateAsync: updateCustomer } = useUpdateCustomerMutation();
   const navigate = useNavigate();

   const form = useForm<CreateCustomer>({
      resolver: zodResolver(createCustomerSchema),
      defaultValues: {
         nome: '',
         telefone: '',
         cpf: '',
         endereco: {
            cidade: "Nova Venécia",
            estado: "ES",
         },
      },
   });

   const onSubmit = async (values: CreateCustomer) => {
      try {
         if (customerId) {
            await updateCustomer({ id: customerId, data: values });
         } else {
            await createCustomer(values);
         }

         showSuccess("Operação realizada com sucesso.");
         navigate("/sistema/clientes");

      } catch (err: any) {
         showError(err.message);
      }
   };


   useEffect(() => {
      if (customer) {
         form.reset(customer);
      }
   }, [customer, form]);


   return (
      <FormProvider {...form}>
         <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="mt-10"
         >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <InputFormItem 
                  label="Nome"
                  name="nome"
               />

               <MaskFormItem 
                  label="Telefone"
                  name="telefone"
                  format="(##) #####-####"
                  placeholder="(99) 99999-9999"
               />

               <MaskFormItem 
                  label="CPF"
                  name="cpf"
                  format="###.###.###-##"
                  placeholder="999.999.999-99"
               />

               <InputFormItem 
                  label="Descrição do endereço"
                  name="endereco.descricao"
               />

               <InputFormItem 
                  label="Cidade"
                  name="endereco.cidade"
                  disabled
               />

               <InputFormItem 
                  label="Estado"
                  name="endereco.estado"
                  disabled
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
                  label="Loja x cliente (km)"
                  name="endereco.kmLojaCliente"
                  type="number"
               />

               <InputFormItem 
                  label="Referência"
                  name="endereco.referencia"
               />
            </div>

            <div className="flex items-center gap-4 mt-20">
               <Button type="submit">
                  { customerId ? "Salvar" : "Cadastrar" }
               </Button>

               <Button 
                  type="button"
                  variant={"outline"} 
                  onClick={() => navigate(-1)}
               >
                  Cancelar
               </Button>
            </div>
         </form>
      </FormProvider>
   )
}
