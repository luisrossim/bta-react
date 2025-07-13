import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UtilsService } from "@/utils/services/utils-service";
import { Ban, CheckCircle, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { RoleBadge } from "@/pages/user/components/RoleBadge";
import type { Roles } from "@/models/role";
import { EmptyData } from "@/components/empty-data";
import { useUsers } from "../hooks/useUsers";
import { UserStatusIcon } from "./UserStatusIcon";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PatternFormat } from "react-number-format";


export function UserList() {
   const {
      users,
      changeUserStatus,
      fetchUsers,
      disableActions
   } = useUsers();

   useEffect(() => {
      fetchUsers();
   }, [])

   if(!users || users.length == 0) return <EmptyData />

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
                     <RoleBadge 
                        role={user.role.descricao as Roles} 
                        rounded={false} 
                     />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                     <PatternFormat 
                        format="(##) #####-####" 
                        displayType="text" 
                        value={user.telefone} 
                     />
                  </TableCell>
                  <TableCell>
                     <UserStatusIcon isAtivo={user.isAtivo} />
                  </TableCell>
                  <TableCell className="text-neutral-500">
                     {UtilsService.formatDate(user.criadoEm)}
                  </TableCell>
                  
                  <TableCell className="flex gap-2 items-center justify-end">
                     <ConfirmDialog
                        onConfirm={() => changeUserStatus(user.id)}
                        disabled={disableActions}
                        title={user.isAtivo ? "Desativar usuário?" : "Ativar usuário?"}
                        description={`Deseja alterar o status de acesso do usuário "${user.nome}"?`}
                        trigger={
                           <Button
                              variant={"link"} 
                              className="!p-1"
                              disabled={disableActions}   
                           >
                              {user.isAtivo 
                                 ? <Ban size={16} className="text-red-600" /> 
                                 : <CheckCircle size={16} className="text-emerald-600" />
                              }
                           </Button>
                        }
                     />

                     <Link 
                        to={`/sistema/usuarios/form/${user.id}`} 
                        className="p-1"
                     > 
                        <Edit2 size={16} className="text-neutral-600" />
                     </Link>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
