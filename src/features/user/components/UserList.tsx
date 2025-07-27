import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import { RoleBadge } from "@/features/user/components/RoleBadge";
import type { Roles } from "@/models/role";
import { EmptyData } from "@/shared/components/EmptyData";
import { useUsers } from "../hooks/useUsers";
import { useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { UserStatusToggle } from "./UserStatusToggle";
import { DropdownActions } from "@/shared/components/DropdownActions";
import { formatDate } from "@/shared/utils/formatDate";


export function UserList() {
   const navigate = useNavigate();
   
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
               <TableHead>Criado em</TableHead>
               <TableHead></TableHead>
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
                  <TableCell className="text-slate-500">
                     {formatDate(user.criadoEm)}
                  </TableCell>
                  
                  <TableCell className="flex gap-3 items-center justify-end">
                     <UserStatusToggle
                        user={user}
                        onToggle={changeUserStatus}
                        disableActions={disableActions} 
                     />

                     <DropdownActions 
                        actions={[
                           {
                              label: "Editar",
                              onClick: () => navigate(`/sistema/usuarios/form/${user.id}`)
                           }
                        ]}
                     />
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
