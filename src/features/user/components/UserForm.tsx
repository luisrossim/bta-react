import { createUserSchema, updateUserSchema, type CreateUser, type UpdateUser } from "@/features/user/types/User";
import { SelectFormItem } from "@/shared/components/SelectFormItem";
import { InputFormItem } from "@/shared/components/InputFormItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useUsers } from "../hooks/useUsers";
import { rolesMock } from "@/shared/mocks/rolesMock";
import { MaskFormItem } from "@/shared/components/InputMasked";

interface UserFormProps {
   id?: string
}

export function UserForm({ id }: UserFormProps) {
   const { fetchUserById, saveUser } = useUsers();
   const roles = rolesMock;

   const form = useForm<CreateUser | UpdateUser>({
      resolver: zodResolver(id ? updateUserSchema : createUserSchema)
   })

   const rolesOptions = useMemo(() =>
      roles.map((role) => ({
         value: role.id,
         label: role.descricao
      })), []
   )

   const onSubmit = (data: CreateUser | UpdateUser) => {
      const userId = id ? Number(id) : null;
      saveUser(userId, data);
   };

   const handeFetchUser = async (id: string) => {
      const user = await fetchUserById(id);
      if(user) {
         form.reset(user);
      }
   }

   useEffect(() => {
      if (id) handeFetchUser(id)
   }, [id]);
   
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

               <InputFormItem 
                  label="Email"
                  name="email"
                  type="email"
               />

               {!id && (
                  <InputFormItem 
                     label="Senha de acesso"
                     name="password"
                     type="password"
                  />
               )}

               <SelectFormItem 
                  label="Cargo"
                  name="role.id"
                  options={rolesOptions}
               />

               <MaskFormItem 
                  label="Telefone"
                  name="telefone"
                  format="(##) #####-####"
                  placeholder="(99) 99999-9999"
               />
            </div>

            <div className="flex items-center gap-4 mt-20">
               <Button type="submit">
                  { id ? "Salvar" : "Cadastrar" }
               </Button>

               <Link to={"/sistema/usuarios"}>
                  <Button variant={"outline"}>Cancelar</Button>
               </Link>
            </div>
         </form>
      </FormProvider>
   )
}