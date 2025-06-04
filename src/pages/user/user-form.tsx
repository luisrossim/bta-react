import { PageSubtitle, PageTitle } from "@/components/page-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserSchema, type CreateUser } from "@/models/user";
import { userService } from "@/services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { rolesMock } from "@/utils/mocks/roles-mock";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function UserForm(){
   const roles = rolesMock;
   const navigate = useNavigate();
   const { register, handleSubmit, control, formState:{ errors } } = useForm<CreateUser>({
      resolver: zodResolver(createUserSchema)
   })

   async function saveUser(data: CreateUser) {
      console.log(data)

      userService.createWithRole(data)
         .then(() => actionsForSuccess())
         .catch((err) => toast.error(err?.response?.data?.message || err?.message))
   }

   function actionsForSuccess(){
      toast.success("Usuário cadastrado com sucesso.");
      navigate("/sistema/usuarios");
   }
   
   return (
      <div>
         <div className="grid grid-cols-1 gap-2 mb-8">
            <PageTitle title="Cadastrar novo usuário" />
            <PageSubtitle subtitle="Preencha as informações do usuário e defina uma senha de acesso." />
         </div>

         <form onSubmit={handleSubmit(saveUser)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="grid gap-2 lg:col-span-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input 
                     id="nome" 
                     className={`${errors.nome && "border-red-500"}`}
                     {...register("nome")} 
                  />
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  
                  <Input 
                     id="email" 
                     className={`${errors.email && "border-red-500"}`}
                     {...register("email")}
                  />
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="password">Senha de acesso</Label>
                  <Input
                     id="password"
                     type="password"
                     className={`${errors.password && "border-red-500"}`}
                     {...register("password")}
                  />
               </div>

               <div className="grid gap-2">
                  <Controller
                     name="role.connect.id"
                     defaultValue={2}
                     control={control}
                     render={({ field }) => (
                        <>
                           <Label>Cargo</Label>
                           <Select onValueChange={field.onChange} value={field.value?.toString()}>
                              <SelectTrigger className={`w-full ${errors.role?.connect?.id ? "border-red-500" : ""}`}>
                                 <SelectValue placeholder="" />
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
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                     id="telefone"
                     className={`${errors.telefone && "border-red-500"}`}
                     {...register("telefone")}
                  />
               </div>
            </div>

            <Button type="submit" className="my-6 float-end">
               <Check /> Cadastrar
            </Button>
         </form>
      </div>
   )
}