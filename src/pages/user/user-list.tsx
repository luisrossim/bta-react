import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { userService } from "@/services/user-service";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "@/components/loading";
import { UtilsService } from "@/utils/services/utils-service";
import { Edit2, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { RoleBadge } from "@/components/role-badge";
import { Button } from "@/components/ui/button";
import type { Roles } from "@/models/role";
import type { User } from "@/models/user";
import { ToastService } from "@/utils/services/toast-service";


export function UserList() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

     
   useEffect(() => {
      fetchUsers();
   }, [])


   const fetchUsers = async () => {
      setLoading(true)
      try {
         const users: User[] = await userService.getAll();
         setUsers(users);

      } catch (err: any) {
         ToastService.showError(err?.response?.data?.message || err?.message);
      } finally {
         setLoading(false)
      }
   }


   async function handleDeactivateUser(id: number) {
      try {
         await userService.deactivate(id);
         ToastService.showSuccess("Usuário desativado com sucesso");
         fetchUsers();
      } catch (err: any) {
         ToastService.showError(err.response?.data.message || err.message)
      }
   }


   if(loading) return <LoadingWrapper />

   if(!users || users.length == 0) return <p className="text-slate-500">Nenhum registro encontrado</p>


   return (
      <Table className="table-striped">
         <TableHeader>
            <TableRow>
               <TableHead>Nome</TableHead>
               <TableHead>Cargo</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Telefone</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Criado em</TableHead>
               <TableHead className="text-right">Ações</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {users.map((user) => (
               <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>
                     <RoleBadge role={user.role.descricao as Roles} rounded={false} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telefone}</TableCell>
                  <TableCell>
                     <BadgeStatus isAtivo={user.isAtivo} />
                  </TableCell>
                  <TableCell className="text-slate-500">
                     {UtilsService.formatDate(user.criadoEm)}
                  </TableCell>
                  
                  <TableCell className="flex gap-2 items-center justify-end">
                     <Link to={`/sistema/usuarios/form/${user.id}`} className="p-1"> 
                        <Edit2 size={16} className="text-slate-600" />
                     </Link>
                     <Button onClick={() => handleDeactivateUser(user.id)} variant={"link"}>
                        <Trash size={16} className="text-red-600" />
                     </Button>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

const BadgeStatus = ({ isAtivo }: { isAtivo: boolean}) => {
   const classes = isAtivo ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-700"
   const label = isAtivo ? "Ativo" : "Inativo"

   return (
      <p className={`px-2 py-1  rounded-full text-xs inline-block ${classes}`}>
         {label}
      </p>
   )
}