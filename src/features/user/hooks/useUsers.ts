import type { CreateUser, UpdateUser, User } from '@/features/user/types/User';
import { showError, showSuccess } from '@/shared/utils/showMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { userService } from '../services/userService';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [disableActions, setDisableActions] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const data = await userService.get();
            setUsers(data);
        } catch (err: any) {
            showError(err.message);
        }
    };

    const fetchUserById = async (id: string): Promise<User | undefined> => {
        try {
            return await userService.getById(id);
        } catch (err: any) {
            showError(err.message);
            navigate('/sistema/usuarios');
        }
    };

    const changeUserStatus = async (userId: string) => {
        setDisableActions(true);

        try {
            await userService.changeStatus(userId);
            showSuccess('Status alterado com sucesso');
            await fetchUsers();
        } catch (err: any) {
            showError(err.message);
        } finally {
            setDisableActions(false);
        }
    };

    const saveUser = async (
        id: string | null,
        data: CreateUser | UpdateUser
    ) => {
        setDisableActions(true);
        const toastId = toast.loading('Salvando usuário');

        const normalizedData = {
            ...data,
            password: data.password ?? undefined,
        };

        try {
            if (id) {
                await userService.update(id, normalizedData);
            } else {
                await userService.create(normalizedData);
            }

            toast.success(
                id
                    ? 'Usuário editado com sucesso'
                    : 'Usuário cadastrado com sucesso',
                { id: toastId }
            );

            navigate('/sistema/usuarios');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message, {
                id: toastId,
            });
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
