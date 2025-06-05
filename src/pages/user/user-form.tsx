import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userFormSchema, type User, type UserForm } from "@/models/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userService } from "@/services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { rolesMock } from "@/utils/mocks/roles-mock";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastService } from "@/utils/services/toast-service";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { PageSubtitle, PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { LoadingWrapper } from "@/components/loading";
import { toast } from "sonner";


export default function UserFormPage(){
   const { id } = useParams();
   const roles = rolesMock;
   const [loading, setLoading] = useState<boolean>(false);
   const navigate = useNavigate();
   const { register, handleSubmit, control, reset, formState:{ errors } } = useForm<UserForm>({
      resolver: zodResolver(userFormSchema)
   })

   useEffect(() => {
      if (id) fetchUser();
   }, [id]);


   const fetchUser = async () => {
      setLoading(true);
      try {
         const user: User = await userService.getById(id!);
         reset(user);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message)
         navigate("/sistema/usuarios")
      } finally {
         setLoading(false);
      }
   }

   const handleSaveUser = async (data: UserForm) => {
      const toastId = toast.loading("Salvando usuário");
      
      try {
         if(id) {
            await userService.update(id, data);
            toast.success("Usuário editado com sucesso", { id: toastId });
         } else {
            await userService.create(data);
            toast.success("Usuário cadastrado com sucesso", { id: toastId });
         }
         
         navigate("/sistema/usuarios");

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      }
   }
   

   const titleText = id 
      ? "Editar informações do usuário" 
      : "Cadastrar novo usuário";

   const subTitleText = id 
      ? "Altere as informações do usuário existente" 
      : "Preencha as informações do usuário e defina uma senha de acesso";

   
   
   if(loading) return <LoadingWrapper />
   
   return (
      <div>
         <Breadcrumb label="Usuários" redirectTo="/sistema/usuarios" />
         <PageTitle title={titleText} />
         <PageSubtitle subtitle={subTitleText} />

         <form onSubmit={handleSubmit(handleSaveUser)} className="mt-10">
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
                  <Label htmlFor="email">E-mail</Label>
                  
                  <Input 
                     id="email"
                     disabled={id ? true : false}
                     className={`${errors.email && "border-red-500"}`}
                     {...register("email")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Label htmlFor="password">Senha de acesso</Label>
                  <Input
                     id="password"
                     type="password"
                     disabled={id ? true : false}
                     className={`${errors.password && "border-red-500"}`}
                     {...register("password")}
                  />
               </FormFieldWrapper>

               <FormFieldWrapper>
                  <Controller
                     name="role.id"
                     control={control}
                     defaultValue={2}
                     render={({ field }) => (
                        <>
                           <Label>Cargo</Label>
                           <Select
                              onValueChange={field.onChange}
                              value={field.value?.toString()}
                           >
                              <SelectTrigger className={`w-full ${errors.role?.id && "border-red-500"}`}>
                                 <SelectValue placeholder="Selecione um cargo" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {roles.map((role) => (
                                    <SelectItem key={role.id} value={String(role.id)}>
                                       {role.descricao}
                                    </SelectItem>
                                    ))}
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        </>
                     )}
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
            </div>

            <Button type="submit" className="my-6 float-end">
               <Check /> {id ? "Editar" : "Cadastrar"}
            </Button>
         </form>
      </div>
   )
}
