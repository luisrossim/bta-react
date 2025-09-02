import { Button } from '@/components/ui/button';
import { PageHeader } from '@/shared/components/PageHeader';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserList } from '../components/UserList';
import { useUsers } from '../hooks/useUsers';

export default function ListUsers() {
    const navigate = useNavigate();

    const { users, changeUserStatus, fetchUsers, disableActions } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='space-y-14'>
            <PageHeader
                title='Usuários'
                subtitle='Gerencie as informações e permissões dos usuários do sistema.'
                action={
                    <Button onClick={() => navigate('/sistema/usuarios/form')}>
                        <Plus /> Novo usuário
                    </Button>
                }
            />

            <div className='grid grid-cols-1'>
                <UserList
                    isFetching={false}
                    users={users}
                    onChangeUserStatus={changeUserStatus}
                    disableActions={disableActions}
                />
            </div>
        </div>
    );
}
