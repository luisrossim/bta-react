import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CreateUser, UpdateUser, User } from "@/models/user";
import { userService } from "@/services/user-service";

export function useUsers() {
   const [users, setUsers] = useState<User[]>([]);
   const [disableActions, setDisableActions] = useState<boolean>(false);
   const navigate = useNavigate();

   const fetchUsers = async () => {
      try {
         const data = await userService.getAll();
         setUsers(data);
      } catch (err: any) {
         //ToastService.showError(err?.response?.data?.message || err?.message);
      }
   };

   const fetchUserById = async (id: string): Promise<User | undefined> => {
      try {
         return await userService.getById(id);
      } catch (err: any) {
         //ToastService.showError(err?.response?.data?.message || err?.message);
         navigate("/sistema/usuarios");
      }
   };

   const changeUserStatus = async (userId: number) => {
      setDisableActions(true);

      try {
         await userService.changeStatus(userId);
         //ToastService.showSuccess("Status alterado com sucesso");
         await fetchUsers();

      } catch (err: any) {
         //ToastService.showError(err?.response?.data?.message || err?.message);
      } finally {
         setDisableActions(false);
      }
   };

   const saveUser = async (id: number | null, data: CreateUser | UpdateUser) => {
      setDisableActions(true);
      const toastId = toast.loading("Salvando usuário");

      try {
         if (id) {
            await userService.update(id, data);
         } else {
            await userService.create(data);
         }

         toast.success(id 
            ? "Usuário editado com sucesso" 
            : "Usuário cadastrado com sucesso",
            { id: toastId }
         );

         navigate("/sistema/usuarios");

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   };

   return {
      users,
      fetchUsers,
      fetchUserById,
      changeUserStatus,
      saveUser,
      disableActions,
   };
}
