import { userService } from "@/services/user-service";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "@/components/loading";
import { UtilsService } from "@/utils/services/utils-service";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { User } from "@/models/user";
import { toast } from "sonner";
import { Edit2, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { RoleBadge } from "@/components/role-badge";
import type { Roles } from "@/models/role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function UserList() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      setLoading(true);
      
      userService.getAll()
         .then((res) => setUsers(res))
         .catch((err) => toast.error(err.response?.data.message || err.message))
         .finally(() => setLoading(false))
   }, [])


   if(loading) return <LoadingWrapper />


   return (
      <Table>
         <TableHeader className="bg-slate-100">
            <TableRow>
               <TableHead>Nome</TableHead>
               <TableHead>Cargo</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Telefone</TableHead>
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
                  <TableCell>{UtilsService.formatDate(user.criadoEm)}</TableCell>
                  <TableCell className="flex gap-4 items-center justify-end">
                     <Tooltip>
                        <TooltipTrigger>
                           <Link to={"/"}><Edit2 size={16} className="text-slate-600" /></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           Editar
                        </TooltipContent>
                     </Tooltip>

                     <Tooltip>
                        <TooltipTrigger>
                           <Link to={"/"}><Trash size={16} className="text-red-600" /></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           Excluir
                        </TooltipContent>
                     </Tooltip>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
